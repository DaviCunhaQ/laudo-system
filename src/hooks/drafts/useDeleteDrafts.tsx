"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorAxiosDto, ResponseAxiosDto } from "../../dtos";
import { api } from "../../services/api";
import toast from 'react-hot-toast'
import { DraftQueryKeys } from "./draft-query-keys";

interface ResponseAxiosOccurrence extends ResponseAxiosDto<{ id: string , message: string}>{
  id: string;
}

export async function deleteDraft(id: string){
  const response = await api.delete<ResponseAxiosOccurrence>(`/drafts/${id}`)

  return response.data;
}

export function useDeleteDraft(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDraft,
    onMutate: async ()=>{
      await queryClient.cancelQueries({queryKey: DraftQueryKeys.all})
    },
    onSuccess: (data) => {
      const message = data?.message || "Rascunho deletado com sucesso.";
      toast.success(message);
    },
    onError: (data: ErrorAxiosDto) => {
      const message = data.response?.data.message || "Ocorreu um erro ao deletar o rascunho.";
      toast.error(message);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: DraftQueryKeys.all,
      });
    },
  })
}