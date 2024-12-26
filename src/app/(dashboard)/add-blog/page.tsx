"use client";
import CButton from "@/components/ui_component/form/CButton";
import CForm from "@/components/ui_component/form/CForm";
import CImageInput from "@/components/ui_component/form/CImageIput";
import CInput from "@/components/ui_component/form/Cinput";
import CTextEditor from "@/components/ui_component/form/CTextEditor";
import { useAddBlog } from "@/hooks/blogs/blog.hook";
import { uploadImagesToCloudinary } from "@/lib/utils/uploadImage";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const AddBlog = () => {
  const { mutate } = useAddBlog();

  const onFromSubmit = async (data: FieldValues) => {
    const photos = await uploadImagesToCloudinary(data.photo);

    if (photos) {
      mutate(
        { ...data, photo: photos[0] },
        {
          onSuccess: () => {
            toast.success("Blog added");
          },
        }
      );
      console.log(data);
    }
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
            <CInput label="Blog Title" name="name"></CInput>

            <CTextEditor name="description" label="Description"></CTextEditor>
            <CButton text="Add Blog" type="submit"></CButton>
          </div>
        </CForm>
      </div>
    </div>
  );
};

export default AddBlog;
