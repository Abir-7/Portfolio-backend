/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/axiosInterceptor/axios";

import { FieldValues } from "react-hook-form";

export const addSkill = async (data: FieldValues) => {
  try {
    const res = await axiosInstance.post(`/skills/add`, data);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllSkill = async () => {
  try {
    const res = await axiosInstance.get(`/skills`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const editSingleSkill = async (data: {
  id: string;
  data: FieldValues;
}) => {
  try {
    const res = await axiosInstance.patch(`/skills/${data.id}`, data);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteSingleSkill = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/skills/${id}`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error: any) => {
  throw new Error(error?.response?.data?.message || error?.message || error);
};
