"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorAxiosDto, ResponseAxiosDto } from "../../dtos";
import toast from 'react-hot-toast'
import { paymentApi } from "@/services/paymentApi";
import { SendMessageSchema } from "@/dtos/message";

const messageQueryKeys = {
  all: ["messages"],
  lists: () => [...messageQueryKeys.all, "list"],
  list: (filters: Record<string, any>) => [...messageQueryKeys.lists(), { filters }],
  details: () => [...messageQueryKeys.all, "detail"],
  detail: (id: string | number) => [...messageQueryKeys.details(), id],
};

interface ResponseAxiosOccurrence extends ResponseAxiosDto<{ id: string , message: string}>{
  id: string;
}

export async function sendMessage(payload: SendMessageSchema){
  const response = await paymentApi.post<ResponseAxiosOccurrence>("/" , payload)
  return response.data;
}

export function useSendMessage(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendMessage,
    onMutate: async ()=>{
      await queryClient.cancelQueries({queryKey: messageQueryKeys.all})
    },
    onSuccess: () => {
      toast.success("Mensagem enviada com sucesso!");
    },
    onError: (data: ErrorAxiosDto) => {
      console.error(data)
      const message = data.response?.data.message || "Ocorreu um erro ao enviar a mensagem.";
      toast.error(message);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: messageQueryKeys.all,
      });
    },
  })
}