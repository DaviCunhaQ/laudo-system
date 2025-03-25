"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorAxiosDto, ResponseAxiosDto } from "../../dtos";
import { api } from "../../services/api";
import toast from 'react-hot-toast'
import { occurrenceQueryKeys } from "./occurrence-query-keys";

interface ResponseAxiosOccurrence extends ResponseAxiosDto<{ id: string , message: string}>{
  id: string;
}

export async function deleteOccurrence(id: string){
  const response = await api.delete<ResponseAxiosOccurrence>(`/occurrences/${id}`)

  return response.data;
}

export function useDeleteOccurrence(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteOccurrence,
    onMutate: async ()=>{
      await queryClient.cancelQueries({queryKey: occurrenceQueryKeys.all})
    },
    onSuccess: (data) => {
      const message = data?.message || "Ocorrência deletada com sucesso.";
      toast.success(message);
    },
    onError: (data: ErrorAxiosDto) => {
      const message = data.response?.data.message || "Ocorreu um erro ao deletar a ocorrência.";
      toast.error(message);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: occurrenceQueryKeys.all,
      });
    },
  })
}