import React, { ReactNode } from "react";
import { z } from "zod";
import { Control } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { TransformationsFormSchema } from "@/lib/schemas/transformationsForm.schema";

interface CustomFieldProps {
  control: Control<z.infer<typeof TransformationsFormSchema>> | undefined;
  render: (props: { field: any }) => ReactNode;
  name: keyof z.infer<typeof TransformationsFormSchema>;
  formLabel?: string;
  className?: string;
}

export const CustomField = ({
  control,
  render,
  name,
  formLabel,
  className,
}: CustomFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {formLabel && <FormLabel>{formLabel}</FormLabel>}
          <FormControl>{render({ field })}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
