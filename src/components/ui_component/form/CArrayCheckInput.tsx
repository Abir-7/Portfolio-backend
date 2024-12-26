"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface CheckboxOption {
  _id: string;
  skill: string;
  icon?: string;
}

interface CheckboxArrayProps {
  name: string;
  label?: string;
  options: CheckboxOption[];
  required?: boolean;
}

const CCheckboxArray = ({
  name,
  label,
  options,
  required = true,
}: CheckboxArrayProps) => {
  const {
    register,

    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid w-full gap-2">
      {label && <Label className="font-bold">{label}</Label>}
      <div className="flex flex-wrap gap-4 border p-2 rounded-lg">
        {options?.map((option) => (
          <div key={option._id} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={option._id}
              value={option._id}
              {...register(name, {
                required: required
                  ? "At least one option must be selected."
                  : false,
              })}
            />
            <Label htmlFor={option._id} className="flex items-center gap-2">
              {option.icon && (
                <Image
                  width={40}
                  height={40}
                  src={option.icon}
                  alt={option.skill}
                  className="w-5 h-5"
                />
              )}
              {option.skill}
            </Label>
          </div>
        ))}
      </div>
      {errors[name] && (
        <p className="text-red-500 text-sm">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default CCheckboxArray;
