/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { jwtDecode } from "jwt-decode";

import axiosInstance from "@/lib/axiosInterceptor/axios";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const logout = async () => {
  cookies().delete("accessToken");
};

export const userLogin = async (loginInfo: FieldValues) => {
  try {
    const { data }: { data: { data: { token: string } } } =
      await axiosInstance.post(`/auth/login`, loginInfo);
    console.log(loginInfo);
    // Set the token in a cookie
    cookies().set("accessToken", data?.data?.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 60, // 60 days
    });

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getCurrentUser = async () => {
  const token = cookies().get("accessToken")?.value;

  let decode = null;

  if (token) {
    decode = await jwtDecode(token as string);
  }

  return await decode;
};

const handleError = (error: any) => {
  console.log(error);
  throw new Error(error?.response?.data?.message || error?.message || error);
};
