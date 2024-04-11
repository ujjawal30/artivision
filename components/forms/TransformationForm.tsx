"use client";

import React, { useState, useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  aspectRatioKey,
  aspectRatioOptions,
  defaultValues,
  transformationTypes,
} from "@/constants";
import { TransformationsFormSchema } from "@/lib/schemas/transformationsForm.schema";
import { debounce, deepMergeObjects } from "@/lib/utils";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomField } from "@/components/miscellaneous/CustomField";
import MediaUploader from "@/components/forms/MediaUploader";

const TransformationForm = ({
  action,
  userId,
  type,
  creditBalance,
  data = null,
  config = null,
}: TransformationFormProps) => {
  const [image, setImage] = useState(data);
  const [newTransformation, setNewTransformation] =
    useState<Transformations | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformationConfig, setTransformationConfig] = useState(config);

  const [isPending, startTransition] = useTransition();

  const transformationType = transformationTypes[type];
  const initialValues: z.infer<typeof TransformationsFormSchema> =
    data && action === "Update"
      ? {
          title: data.title,
          aspectRatio: data.aspectRatio,
          color: data.color,
          prompt: data.prompt,
          publicId: data.publicId,
        }
      : defaultValues;

  const form = useForm<z.infer<typeof TransformationsFormSchema>>({
    resolver: zodResolver(TransformationsFormSchema),
    defaultValues: initialValues,
  });

  const onSubmitHandler = (
    values: z.infer<typeof TransformationsFormSchema>
  ) => {
    console.log(values);
  };

  const onSelectFieldHandler = (
    value: aspectRatioKey,
    onChangeField: (value: string) => void
  ) => {
    const imageSize = aspectRatioOptions[value];

    setImage((prev: any) => ({
      ...prev,
      aspectRatio: imageSize.aspectRatio,
      width: imageSize.width,
      height: imageSize.height,
    }));

    setNewTransformation(transformationType.config);

    return onChangeField(value);
  };

  const onInputChangeHandler = (
    fieldName: string,
    value: string,
    type: "recolor" | "remove",
    onChangeField: (value: string) => void
  ) => {
    debounce(() => {
      setNewTransformation((prev: any) => ({
        ...prev,
        [type]: {
          ...prev?.[type],
          [fieldName === "prompt" ? "prompt" : "to"]: value,
        },
      }));
    }, 1000);

    return onChangeField(value);
  };

  const onTransformHandler = async () => {
    setIsTransforming(true);
    setTransformationConfig(
      deepMergeObjects(newTransformation, transformationConfig)
    );
    setNewTransformation(null);

    startTransition(async () => {
      // updateCredits
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)} className="space-y-8">
        <CustomField
          control={form.control}
          name="title"
          formLabel="Image Title"
          className="w-full"
          render={({ field }) => (
            <Input
              {...field}
              className="rounded-2xl border-2 !border-claret-200/20 shadow-sm !shadow-claret-200/15 text-dark-600 disabled:opacity-100 font-semibold h-12 md:h-14 focus-visible:ring-offset-0 px-4 py-3 focus-visible:ring-transparent"
            />
          )}
        />

        {type === "fill" && (
          <CustomField
            control={form.control}
            name="aspectRatio"
            formLabel="Aspect Ratio"
            className="w-full"
            render={({ field }: { field: any }) => (
              <Select
                onValueChange={(value: aspectRatioKey) =>
                  onSelectFieldHandler(value, field.onChange)
                }
              >
                <SelectTrigger className="w-full border-2 border-claret-200/20 shadow-sm shadow-claret-200/15 rounded-2xl h-12 md:h-14 text-dark-600 font-semibold disabled:opacity-100 placeholder:text-dark-400/50 px-4 py-3 focus:ring-offset-0 focus-visible:ring-transparent focus:ring-transparent focus-visible:ring-0 focus-visible:outline-none">
                  <SelectValue placeholder="Select Size" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(aspectRatioOptions).map((option) => (
                    <SelectItem
                      value={option}
                      key={option}
                      className="py-3 cursor-pointer focus-within:!bg-claret-100 hover:!bg-claret-100"
                    >
                      {aspectRatioOptions[option as aspectRatioKey].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        )}

        {(type === "remove" || type === "recolor") && (
          <div className="flex flex-col gap-5 lg:flex-row lg:gap-10">
            <CustomField
              control={form.control}
              name="prompt"
              formLabel={
                type === "remove" ? "Object to remove" : "Object to recolor"
              }
              className="w-full"
              render={({ field }) => (
                <Input
                  value={field.value}
                  className="rounded-2xl border-2 !border-claret-200/20 shadow-sm !shadow-claret-200/15 text-dark-600 disabled:opacity-100 font-semibold h-12 md:h-14 focus-visible:ring-offset-0 px-4 py-3 focus-visible:ring-transparent"
                  onChange={(e) =>
                    onInputChangeHandler(
                      "prompt",
                      e.target.value,
                      type,
                      field.onChange
                    )
                  }
                />
              )}
            />

            {type === "recolor" && (
              <CustomField
                control={form.control}
                name="color"
                formLabel="Replacement Color"
                className="w-full"
                render={({ field }) => (
                  <Input
                    value={field.value}
                    className="rounded-2xl border-2 !border-claret-200/20 shadow-sm !shadow-claret-200/15 text-dark-600 disabled:opacity-100 font-semibold h-12 md:h-14 focus-visible:ring-offset-0 px-4 py-3 focus-visible:ring-transparent"
                    onChange={(e) =>
                      onInputChangeHandler(
                        "color",
                        e.target.value,
                        "recolor",
                        field.onChange
                      )
                    }
                  />
                )}
              />
            )}
          </div>
        )}

        <div className="grid h-fit min-h-48 grid-cols-1 gap-5 py-4 md:grid-cols-2">
          <CustomField
            control={form.control}
            name="publicId"
            className="flex size-full flex-col"
            render={({ field }) => (
              <MediaUploader
                onValueChange={field.onChange}
                setImage={setImage}
                publicId={field.value}
                image={image}
                type={type}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Button
            type="button"
            className="bg-gradient-to-r from-claret-500 to-flamingo-500 bg-cover rounded-2xl py-4 px-6 p-16-semibold h-12 w-full md:h-14 font-semibold capitalize"
            disabled={isTransforming || newTransformation === null}
            onClick={onTransformHandler}
          >
            {isTransforming ? "Transforming..." : "Apply Transformation"}
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-claret-500 to-flamingo-500 bg-cover rounded-2xl py-4 px-6 p-16-semibold h-12 w-full md:h-14 font-semibold capitalize"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Save Image"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TransformationForm;
