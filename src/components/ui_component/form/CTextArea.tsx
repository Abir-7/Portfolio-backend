"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useFormContext } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;

  placeHolder?: string;
  required?: boolean;
}

const CTextArea = ({
  name,
  label,
  placeHolder,
  required = true,
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid w-full items-center gap-1.5">
      {label && (
        <Label className="font-bold" htmlFor={name}>
          {label}
        </Label>
      )}
      <Textarea
        placeholder={placeHolder}
        {...register(name, {
          required: required ? "This field is required." : false,
        })}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm ">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default CTextArea;
