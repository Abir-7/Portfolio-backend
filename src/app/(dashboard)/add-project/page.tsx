"use client";
import CCheckboxArray from "@/components/ui_component/form/CArrayCheckInput";
import CArrayInput from "@/components/ui_component/form/CArrayInput";
import CButton from "@/components/ui_component/form/CButton";

import CForm from "@/components/ui_component/form/CForm";
import CImageInput from "@/components/ui_component/form/CImageIput";
import CInput from "@/components/ui_component/form/Cinput";
import CTextArea from "@/components/ui_component/form/CTextArea";
import { useAddProject } from "@/hooks/projects/project.hook";
import { useGetAllSkill } from "@/hooks/skills/skill.hook";
import { IApiResponse } from "@/interface/apiResponse.interface";
import { uploadImagesToCloudinary } from "@/lib/utils/uploadImage";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const AddProject = () => {
  interface Skill {
    _id: string;
    icon: string; // URL for the icon
    skillName: string;
  }

  const { data } = useGetAllSkill();
  const { mutate } = useAddProject();
  const onFromSubmit = async (data: FieldValues) => {
    const photos = await uploadImagesToCloudinary(data.photo);

    mutate(
      { ...data, photo: photos },
      {
        onSuccess: () => {
          toast.success("Project Added");
        },
      }
    );
    console.log(data);
  };
  return (
    <div className="mb-10">
      <p className="text-2xl text-center font-semibold underline underline-offset-1">
        Add Project
      </p>
      <div className="max-w-screen-md mx-auto">
        <CForm onFromSubmit={onFromSubmit}>
          <div className="space-y-2">
            <CImageInput label="Image" name="photo"></CImageInput>
            <CInput label="Project Name" name="name"></CInput>
            <CTextArea label="Description" name="description"></CTextArea>
            <CArrayInput name="features" label="Features"></CArrayInput>
            <CCheckboxArray
              name="technologies"
              label="Technology Used"
              options={(data as IApiResponse<Skill[]>)?.data?.map((skill) => ({
                _id: skill._id,
                skill: skill.skillName,
                icon: skill.icon,
              }))}
            ></CCheckboxArray>
            <CInput label="Git Client" name="client"></CInput>
            <CInput label="Git Server" name="server"></CInput>
            <CInput label="Live Link" name="live"></CInput>
            <CButton text="Add Project" type="submit"></CButton>
          </div>
        </CForm>
      </div>
    </div>
  );
};

export default AddProject;
