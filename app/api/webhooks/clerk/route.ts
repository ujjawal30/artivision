import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { clerkClient } from "@clerk/nextjs";
import { WebhookEvent } from "@clerk/nextjs/server";

import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET_KEY!;

  if (!WEBHOOK_SECRET)
    return new NextResponse(
      "[CLERK_WEBHOOK_ERROR]: Please define the MONGODB_URI environment variable inside .env.local",
      { status: 500 }
    );

  const headerPayload = headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature)
    return new NextResponse(
      "[CLERK_WEBHOOK_ERROR]: Svix headers not found!!!",
      { status: 400 }
    );

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let event: WebhookEvent;

  try {
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (error) {
    console.error("[CLERK_WEBHOOK_ERROR]: Error verifying webhook", error);
    return new NextResponse("[CLERK_WEBHOOK_ERROR]: Error verifying webhook", {
      status: 400,
    });
  }

  const { id } = event.data;
  const eventType = event.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    const user: CreateUserParams = {
      clerkId: id,
      email: email_addresses[0].email_address,
      firstName: first_name,
      lastName: last_name,
      photo: image_url,
    };

    const newUser = await createUser(user);

    if (newUser) {
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: newUser._id,
        },
      });
    }

    return NextResponse.json({ message: "OK", user: newUser });
  }

  if (eventType === "user.updated") {
    const { id, first_name, last_name, image_url } = event.data;

    const user: UpdateUserParams = {
      firstName: first_name,
      lastName: last_name,
      photo: image_url,
    };

    const updatedUser = await updateUser(id, user);

    return NextResponse.json({ message: "OK", user: updatedUser });
  }

  if (eventType === "user.deleted") {
    const { id } = event.data;

    const deletedUser = await deleteUser(id!);

    return NextResponse.json({ message: "OK", user: deletedUser });
  }

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);

  return new NextResponse(null, { status: 200 });
}
