/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addProject,
  deleteSingleProject,
  getAllProject,
  getSingleProject,
} from "@/service/project";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

// Add Project Hook
export const useAddProject = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues, unknown>({
    mutationFn: (data: any) => addProject(data),
    onSuccess: () => {
      // Invalidate the 'getAllProject' query to refetch data
      queryClient.invalidateQueries({ queryKey: ["getAllProject"] });
    },
  });
};

// Delete Project Hook
export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string, unknown>({
    mutationFn: (data: string) => deleteSingleProject(data),
    onSuccess: () => {
      // Invalidate the 'getAllProject' query to refetch data
      queryClient.invalidateQueries({ queryKey: ["getAllProject"] });
    },
  });
};

// Get All Projects Hook
export const useGetAllProject = () => {
  return useQuery({
    queryKey: ["getAllProject"],
    queryFn: () => getAllProject(),
  });
};

export const useGetSignleProject = (id: string) => {
  return useQuery({
    enabled: !id,
    queryKey: ["getSingleProject"],
    queryFn: () => getSingleProject(id),
  });
};
