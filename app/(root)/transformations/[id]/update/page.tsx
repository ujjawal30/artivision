import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { transformationTypes } from "@/constants";
import { getUser } from "@/lib/actions/user.actions";
import { getImageById } from "@/lib/actions/image.actions";
import Header from "@/components/miscellaneous/Header";
import TransformationForm from "@/components/forms/TransformationForm";

const UpdateTransformationsPage = async ({
  params: { id },
}: SearchParamProps) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUser(userId);
  const image = await getImageById(id);

  if (!user || !image) redirect("/");

  const transformation =
    transformationTypes[image.transformationType as TransformationTypeKey];

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subtitle} />

      <section className="mt-10">
        <TransformationForm
          action="Update"
          userId={user._id}
          type={image.transformationType as TransformationTypeKey}
          creditBalance={user.creditBalance}
          config={image.config}
          data={image}
        />
      </section>
    </>
  );
};

export default UpdateTransformationsPage;
