import Header from "@/components/shared/Header";
import { transformationTypes } from "@/constants";
import React from "react";

const AddTransformationsPage = ({ params: { type } }: SearchParamProps) => {
  const transformation = transformationTypes[type];

  return (
    <div>
      <Header title={transformation.title} subtitle={transformation.subtitle} />
    </div>
  );
};

export default AddTransformationsPage;
