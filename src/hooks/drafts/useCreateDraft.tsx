"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorAxiosDto, ResponseAxiosDto, ServiceOrderSchema } from "../../dtos";
import { api } from "../../services/api";
import toast from 'react-hot-toast'
import { DraftQueryKeys } from "./draft-query-keys";

interface ResponseAxiosOccurrence extends ResponseAxiosDto<{ id: string , message: string}>{
  id: string;
}

interface CreateDraftSchema extends Partial<ServiceOrderSchema> {
  id?: string;
}

export async function createDraft(payload: CreateDraftSchema) {
  const {id, ...rest} = payload
  const response = await api.post<ResponseAxiosOccurrence>(`/drafts${id ? `/${id}` : "" }` , rest)

  return response.data;
}

export function useCreateDraft(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDraft,
    onMutate: async ()=>{
      await queryClient.cancelQueries({queryKey: DraftQueryKeys.all})
    },
    onSuccess: () => {
    },
    onError: (data: ErrorAxiosDto) => {
      const message = data.response?.data.message || "Ocorreu um erro ao adicionar estes dados.";
      toast.error(message);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: DraftQueryKeys.all,
      });
    },
  })
}