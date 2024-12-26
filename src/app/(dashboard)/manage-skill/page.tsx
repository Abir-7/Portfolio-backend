/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useEditSkill, useGetAllSkill } from "@/hooks/skills/skill.hook";
import { IApiResponse } from "@/interface/apiResponse.interface";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CForm from "@/components/ui_component/form/CForm";
import CImageInput from "@/components/ui_component/form/CImageIput";
import CInput from "@/components/ui_component/form/Cinput";
import CButton from "@/components/ui_component/form/CButton";
import { FieldValues } from "react-hook-form";
import { uploadImagesToCloudinary } from "@/lib/utils/uploadImage";
import { toast } from "sonner";

interface Skill {
  _id: string;
  icon: string; // URL for the icon
  skillName: string;
}

const ManageSkill = () => {
  const { data } = useGetAllSkill();
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const { mutate } = useEditSkill();

  const onFormSubmit = async (formData: FieldValues) => {
    if (!selectedSkill) return;

    // Prepare the payload with updated fields only
    const updatedData: Partial<Skill> = {};

    if (formData.icon && formData.icon.length > 0) {
      const photos = await uploadImagesToCloudinary(formData.icon);
      if (photos && photos.length > 0) {
        updatedData.icon = photos[0]; // Use the uploaded image URL
      }
    }

    if (formData.skillName && formData.skillName !== selectedSkill.skillName) {
      updatedData.skillName = formData.skillName;
    }

    if (Object.keys(updatedData).length === 0) {
      alert("No changes detected.");
      return;
    }

    const payload = {
      id: selectedSkill._id,
      data: updatedData,
    };

    mutate(payload, {
      onSuccess: () => {
        toast.success("Skill updated successfully");
        setSelectedSkill(null); // Close the dialog after success
      },
      onError: (error) => {
        console.error("Failed to update skill", error);
      },
    });
  };

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {(data as IApiResponse<Skill[]>)?.data.map((skill) => (
        <div
          key={skill._id}
          className="border rounded-lg p-4 shadow-md flex items-center gap-4"
        >
          <Image
            src={skill.icon}
            alt={skill.skillName}
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="flex-1">
            <div className="text-lg font-medium">{skill.skillName}</div>
          </div>
          <Dialog
            open={selectedSkill?._id === skill._id}
            onOpenChange={() =>
              setSelectedSkill(selectedSkill?._id === skill._id ? null : skill)
            }
          >
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Skill</DialogTitle>
              </DialogHeader>
              <CForm onFromSubmit={onFormSubmit}>
                <div className="space-y-2">
                  <CImageInput required={false} label="Icon" name="icon" />
                  <CInput
                    required={false}
                    label="Skill Name"
                    name="skillName"
                  />
                  <CButton text="Update Skill" type="submit" />
                </div>
              </CForm>
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
  );
};

export default ManageSkill;
