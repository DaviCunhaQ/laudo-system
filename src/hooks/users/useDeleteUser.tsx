"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorAxiosDto, ResponseAxiosDto } from "../../dtos";
import { api } from "../../services/api";
import toast from 'react-hot-toast'
import { userQueryKeys } from "./user-query-keys";

interface ResponseAxiosOccurrence extends ResponseAxiosDto<{ id: string , message: string}>{
  id: string;
}

export async function deleteUser(id: string){
  const response = await api.delete<ResponseAxiosOccurrence>(`/users/${id}`)

  return response.data;
}

export function useDeleteUser(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onMutate: async ()=>{
      await queryClient.cancelQueries({queryKey: userQueryKeys.all})
    },
    onSuccess: (data) => {
      const message = data?.message || "Usuário deletado com sucesso.";
      toast.success(message);
    },
    onError: (data: ErrorAxiosDto) => {
      const message = data.response?.data.message || "Ocorreu um erro ao deletar o usuário.";
      toast.error(message);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: userQueryKeys.all,
      });
    },
  })
}