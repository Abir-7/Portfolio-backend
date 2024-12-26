"use client";
import CButton from "@/components/ui_component/form/CButton";
import CForm from "@/components/ui_component/form/CForm";
import CInput from "@/components/ui_component/form/Cinput";
import { useUserlogin } from "@/hooks/auth/auth.hooks";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const { mutate } = useUserlogin();
  const onFromSubmit = async (data: FieldValues) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Successfull");
        router.push("/");
      },
    });
    console.log(data);
  };
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="max-w-screen-md w-[100%] mx-auto px-3">
        <p className="text-xl font-semibold text-center my-4">Admin Login</p>
        <div>
          <CForm onFromSubmit={onFromSubmit}>
            <div className="space-y-2">
              <CInput name="email" label="Email"></CInput>
              <CInput name="password" label="Password"></CInput>
              <CButton text="Login" type="submit"></CButton>
            </div>
          </CForm>
        </div>
      </div>
    </div>
  );
};

export default Page;
