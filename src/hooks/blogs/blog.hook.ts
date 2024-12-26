/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addBlog,
  deleteSingleBlog,
  editSingleBlog,
  getAllBlog,
  getSigleBlog,
} from "@/service/blogs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

// Add Blog Hook
export const useAddBlog = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues, unknown>({
    mutationFn: (data: any) => addBlog(data),
    onSuccess: () => {
      // Invalidate the 'getAllBlog' query to refetch the updated blogs data
      queryClient.invalidateQueries({ queryKey: ["getAllBlog"] });
    },
  });
};

// Edit Blog Hook
export const useEditBlog = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { id: string; data: any }, unknown>({
    mutationFn: (data) => editSingleBlog(data),
    onSuccess: () => {
      // Invalidate the 'getAllBlog' query to refetch the updated blogs data
      queryClient.invalidateQueries({ queryKey: ["getAllBlog"] });
    },
  });
};

// Delete Blog Hook
export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string, unknown>({
    mutationFn: (data) => deleteSingleBlog(data),
    onSuccess: () => {
      // Invalidate the 'getAllBlog' query to refetch the updated blogs data
      queryClient.invalidateQueries({ queryKey: ["getAllBlog"] });
    },
  });
};

// Get All Blogs Hook
export const useGetAllBlog = () => {
  return useQuery({
    queryKey: ["getAllBlog"],
    queryFn: () => getAllBlog(),
  });
};

// Get All Blogs Hook
export const useGetSingleBlog = (id: string) => {
  return useQuery({
    enabled: !id,
    queryKey: ["getSingleBlog"],
    queryFn: () => getSigleBlog(id),
  });
};
