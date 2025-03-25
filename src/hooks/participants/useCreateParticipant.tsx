"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorAxiosDto, ResponseAxiosDto ,  ParticipantFormSchema } from "../../dtos";
import { api } from "../../services/api";
import toast from 'react-hot-toast'
import { ParticipantQueryKeys } from "./participant-query-keys";

export async function createParticipant(payload: ParticipantFormSchema){
  const response = await api.post<ResponseAxiosDto<{ id: string , message: string}>>("/participants" , payload.participants)

  return response.data;
}

export function useCreateParticipant(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createParticipant,
    onMutate: async ()=>{
      await queryClient.cancelQueries({queryKey: ParticipantQueryKeys.all})
    },
    onSuccess: () => {
    },
    onError: (data: ErrorAxiosDto) => {
      const message = data.response?.data.message || "Ocorreu um erro ao adicionar estes dados.";
      toast.error(message);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ParticipantQueryKeys.all,
      });
    },
  })
}