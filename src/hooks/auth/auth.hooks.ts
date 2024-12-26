/* eslint-disable @typescript-eslint/no-explicit-any */
import { userLogin } from "@/service/auth";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

export const useUserlogin = () => {
  return useMutation<any, Error, FieldValues, unknown>({
    mutationFn: (data: any) => userLogin(data),
  });
};
