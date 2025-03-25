"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorAxiosDto, OccurrenceSchema, ResponseAxiosDto } from "../../dtos";
import { api } from "../../services/api";
import toast from 'react-hot-toast'
import { occurrenceQueryKeys } from "./occurrence-query-keys";

interface ResponseAxiosOccurrence extends ResponseAxiosDto<{ id: string , message: string}>{
  id: string;
}

export async function createOccurrence(payload: OccurrenceSchema){
  const response = await api.post<ResponseAxiosOccurrence>("/occurrences" , payload)

  return response.data;
}

export function useCreateOccurrence(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOccurrence,
    onMutate: async ()=>{
      await queryClient.cancelQueries({queryKey: occurrenceQueryKeys.all})
    },
    onSuccess: () => {
    },
    onError: (data: ErrorAxiosDto) => {
      const message = data.response?.data.message || "Ocorreu um erro ao adicionar estes dados.";
      toast.error(message);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: occurrenceQueryKeys.all,
      });
    },
  })
}