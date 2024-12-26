/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/axiosInterceptor/axios";

import { FieldValues } from "react-hook-form";

export const addProject = async (data: FieldValues) => {
  try {
    const res = await axiosInstance.post(`/projects/add`, data);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllProject = async () => {
  try {
    const res = await axiosInstance.get(`/projects`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const editSingleProject = async (data: {
  id: string;
  data: FieldValues;
}) => {
  try {
    const res = await axiosInstance.patch(`/projects/${data.id}`, data);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const getSingleProject = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/projects/${id}`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteSingleProject = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/projects/${id}`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error: any) => {
  throw new Error(error?.response?.data?.message || error?.message || error);
};
