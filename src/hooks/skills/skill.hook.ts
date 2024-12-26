/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addSkill,
  deleteSingleSkill,
  editSingleSkill,
  getAllSkill,
} from "@/service/skills";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

// Add Skill Hook
export const useAddSkill = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues, unknown>({
    mutationFn: (data: any) => addSkill(data),
    onSuccess: () => {
      // Invalidate the 'getAllSkill' query to refetch the updated skills data
      queryClient.invalidateQueries({ queryKey: ["getAllSkill"] });
    },
  });
};

// Edit Skill Hook
export const useEditSkill = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { id: string; data: FieldValues }, unknown>({
    mutationFn: (data) => editSingleSkill(data),
    onSuccess: () => {
      // Invalidate the 'getAllSkill' query to refetch the updated skills data
      queryClient.invalidateQueries({ queryKey: ["getAllSkill"] });
    },
  });
};

// Delete Skill Hook
export const useDeleteSkill = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string, unknown>({
    mutationFn: (data: string) => deleteSingleSkill(data),
    onSuccess: () => {
      // Invalidate the 'getAllSkill' query to refetch the updated skills data
      queryClient.invalidateQueries({ queryKey: ["getAllSkill"] });
    },
  });
};

// Get All Skills Hook
export const useGetAllSkill = () => {
  return useQuery({
    queryKey: ["getAllSkill"],
    queryFn: () => getAllSkill(),
  });
};
