"use client";
import CButton from "@/components/ui_component/form/CButton";
import CForm from "@/components/ui_component/form/CForm";
import CImageInput from "@/components/ui_component/form/CImageIput";
import CInput from "@/components/ui_component/form/Cinput";
import { useAddSkill } from "@/hooks/skills/skill.hook";
import { uploadImagesToCloudinary } from "@/lib/utils/uploadImage";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const AddSkils = () => {
  const { mutate } = useAddSkill();

  const onFromSubmit = async (data: FieldValues) => {
    const icon = data.icon;
    const uploads = await uploadImagesToCloudinary(icon);
    console.log(uploads, "ss");

    if (!!uploads?.length) {
      mutate(
        { ...data, icon: uploads[0] },
        {
          onSuccess: () => {
            toast.success("Skill Added");
          },
        }
      );
    }
  };
  return (
    <div>
      <p className="text-2xl text-center font-semibold underline underline-offset-1">
        Add Skills
      </p>
      <div className="max-w-screen-md mx-auto">
        <CForm onFromSubmit={onFromSubmit}>
          <div className="space-y-2">
            <CImageInput label="Icon" name="icon"></CImageInput>
            <CInput label="Skill Name" name="skillName"></CInput>
            <CButton text="Add Skill" type="submit"></CButton>
          </div>
        </CForm>
      </div>
    </div>
  );
};

export default AddSkils;
