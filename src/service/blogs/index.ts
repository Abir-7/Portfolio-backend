/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/axiosInterceptor/axios";

import { FieldValues } from "react-hook-form";

export const addBlog = async (data: FieldValues) => {
  try {
    const res = await axiosInstance.post(`/blogs/add`, data);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllBlog = async () => {
  try {
    const res = await axiosInstance.get(`/blogs`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};
export const getSigleBlog = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/blogs/${id}`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const editSingleBlog = async (data: {
  id: string;
  data: FieldValues;
}) => {
  try {
    const res = await axiosInstance.patch(`/blogs/${data.id}`, data);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteSingleBlog = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/blogs/${id}`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error: any) => {
  throw new Error(error?.response?.data?.message || error?.message || error);
};
