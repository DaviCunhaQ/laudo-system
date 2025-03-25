"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorAxiosDto, ResponseAxiosDto } from "../../dtos";
import { api } from "../../services/api";
import toast from 'react-hot-toast'
import { occurrenceQueryKeys } from "../occurrence/occurrence-query-keys";
import { ParticipantQueryKeys } from "./participant-query-keys";

interface ResponseAxiosOccurrence extends ResponseAxiosDto<{ id: string , message: string}>{
  id: string;
}

export async function deleteParticipant(id: string){
  const response = await api.delete<ResponseAxiosOccurrence>(`/participants/${id}`)

  return response.data;
}

export function useDeleteParticipant(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteParticipant,
    onMutate: async ()=>{
      await queryClient.cancelQueries({queryKey: ParticipantQueryKeys.all})
      await queryClient.refetchQueries({queryKey: occurrenceQueryKeys.all})
    },
    onSuccess: (data) => {
      const message = data?.message || "Participante deletado com sucesso.";
      toast.success(message);
    },
    onError: (data: ErrorAxiosDto) => {
      const message = data.response?.data.message || "Ocorreu um erro ao deletar o participante.";
      toast.error(message);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ParticipantQueryKeys.all,
      });
    },
  })
}