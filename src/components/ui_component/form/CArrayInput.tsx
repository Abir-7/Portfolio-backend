"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  placeHolder?: string;
  required?: boolean;
}

const CArrayInput = ({
  name,
  label,
  placeHolder,
  required = true,
}: InputProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  // Ensure at least one field exists
  React.useEffect(() => {
    if (fields.length === 0) {
      append("");
    }
  }, [fields, append]);

  return (
    <div className="grid w-full gap-2">
      {label && <Label className="font-bold">{label}</Label>}
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <Input
              placeholder={placeHolder}
              {...register(`${name}.${index}`, {
                required: required ? "This field is required." : false,
              })}
            />
            {fields.length > 0 && (
              <Button
                disabled={fields.length <= 1}
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:underline"
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          onClick={() => append("")}
          className=" bg-blue-700 hover:bg-blue-800 "
        >
          Add More
        </Button>
      </div>
      {errors[name] && (
        <p className="text-red-500 text-sm">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default CArrayInput;
