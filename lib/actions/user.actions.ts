"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/mongoose";
import User, { IUser } from "@/lib/models/user.model";
import { handleError } from "@/lib/utils";

export const createUser = async (
  user: CreateUserParams
): Promise<IUser | undefined> => {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
};

export const getUser = async (userId: string): Promise<IUser | undefined> => {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });
    if (!user) handleError("User not found!!!");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
};

export const updateUser = async (
  userId: string,
  user: UpdateUserParams
): Promise<IUser | undefined> => {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId: userId }, user, {
      new: true,
    });
    if (!updatedUser) handleError("User update failed!!!");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
};

export const deleteUser = async (
  userId: string
): Promise<IUser | undefined> => {
  try {
    await connectToDatabase();

    const userToDelete = await User.findOne({ clerkId: userId });
    if (!userToDelete) handleError("User not found!!!");

    const deletedUser = await User.findByIdAndDelete(userToDelete?._id);
    if (!deletedUser) handleError("User delete failed!!!");

    revalidatePath("/");

    return JSON.parse(JSON.stringify(deletedUser));
  } catch (error) {
    handleError(error);
  }
};

export const updateCredits = async (
  userId: string,
  creditFee: number
): Promise<IUser | undefined> => {
  try {
    await connectToDatabase();

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee } },
      { new: true }
    );

    if (!updatedUserCredits) handleError("User credits update failed!!!");

    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    handleError(error);
  }
};
