"use client";
import { Label } from "@/components/ui/label";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // You can use other themes like 'quill.bubble.css'

// Define the toolbar options including text alignment
const toolbarOptions = [
  [{ align: [] }], // Alignment options: left, center, right, justify
  ["bold", "italic", "underline"],
  ["link"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ header: "1" }, { header: "2" }],
  [{ color: [] }, { background: [] }],
  ["blockquote", "code-block"],
];

interface TextEditorProps {
  name: string;
  label: string;
  placeHolder?: string;
  required?: boolean;
}

const CTextEditor = ({
  name,
  label,
  placeHolder,
  required = true,
}: TextEditorProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid w-full items-center gap-1.5">
      {label && (
        <Label className="font-bold" htmlFor={name}>
          {label}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? "This field is required." : false,
        }}
        render={({ field }) => (
          <ReactQuill
            {...field}
            placeholder={placeHolder}
            theme="snow"
            modules={{
              toolbar: toolbarOptions, // Add the toolbar with text alignment options
            }}
            onChange={(value) => field.onChange(value)} // Update the form value on change
          />
        )}
      />

      {errors[name] && (
        <p className="text-red-500 text-sm">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default CTextEditor;
