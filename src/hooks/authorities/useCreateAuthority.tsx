"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorAxiosDto, ResponseAxiosDto , AuthoritiesFormSchema } from "../../dtos";
import { api } from "../../services/api";
import toast from 'react-hot-toast'
import { AuthorityQueryKeys } from "./authority-query-keys";

export async function createAuthority(payload: AuthoritiesFormSchema){
  const response = await api.post<ResponseAxiosDto<{ id: string , message: string}>>("/authorities" , payload.authorities)

  return response.data;
}

export function useCreateAuthority(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAuthority,
    onMutate: async ()=>{
      await queryClient.cancelQueries({queryKey: AuthorityQueryKeys.all})
    },
    onSuccess: () => {
    },
    onError: (data: ErrorAxiosDto) => {
      const message = data.response?.data.message || "Ocorreu um erro ao adicionar estes dados.";
      toast.error(message);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: AuthorityQueryKeys.all,
      });
    },
  })
}