"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateUserSchema, ErrorAxiosDto, ResponseAxiosDto } from "../../dtos";
import { api } from "../../services/api";
import toast from 'react-hot-toast'
import { userQueryKeys } from "./user-query-keys";

export async function createUser(payload: CreateUserSchema){
  const response = await api.post<ResponseAxiosDto<{ message: string }>>("/users" , payload)
  if (!response.status) {
    throw new Error("Ocorreu um erro no cadastro de usuário.");
  }

  return response.data.body;
}

export function useCreateUser(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onMutate: async ()=>{
      await queryClient.cancelQueries({queryKey: userQueryKeys.all})
    },
    onSuccess: () => {
    },
    onError: (data: ErrorAxiosDto) => {
      const message = data.response?.data.message || "Ocorreu um erro ao adicionar estes dados.";
      toast.error(message);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: userQueryKeys.all,
      });
    },
  })
}