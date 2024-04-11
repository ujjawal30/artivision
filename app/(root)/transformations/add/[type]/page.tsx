import React from "react";

import { transformationTypes } from "@/constants";
import Header from "@/components/shared/Header";
import TransformationForm from "@/components/forms/TransformationForm";
import { auth } from "@clerk/nextjs";
import { getUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const AddTransformationsPage = async ({
  params: { type },
}: SearchParamProps) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const userInfo = await getUser(userId);

  const transformation = transformationTypes[type];

  return (
    <div>
      <Header title={transformation.title} subtitle={transformation.subtitle} />

      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={userInfo?._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={userInfo?.creditBalance || 3}
        />
      </section>
    </div>
  );
};

export default AddTransformationsPage;
