"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorAxiosDto, ResponseAxiosDto } from "../../dtos";
import { api } from "../../services/api";
import toast from 'react-hot-toast'
import { occurrenceQueryKeys } from "../occurrence/occurrence-query-keys";
import { AuthorityQueryKeys } from "./authority-query-keys";

interface ResponseAxiosOccurrence extends ResponseAxiosDto<{ id: string , message: string}>{
  id: string;
}

export async function deleteAuthority(id: string){
  const response = await api.delete<ResponseAxiosOccurrence>(`/authorities/${id}`)

  return response.data;
}

export function useDeleteAuthority(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAuthority,
    onMutate: async ()=>{
      await queryClient.cancelQueries({queryKey: AuthorityQueryKeys.all})
      await queryClient.refetchQueries({queryKey: occurrenceQueryKeys.all})
    },
    onSuccess: (data) => {
      const message = data?.message || "Autoridade deletada com sucesso.";
      toast.success(message);
    },
    onError: (data: ErrorAxiosDto) => {
      const message = data.response?.data.message || "Ocorreu um erro ao deletar a autoridade.";
      toast.error(message);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: AuthorityQueryKeys.all,
      });
    },
  })
}