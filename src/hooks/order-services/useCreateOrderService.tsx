"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorAxiosDto, ResponseAxiosDto, ServiceOrderFormOneSchema } from "../../dtos";
import { api } from "../../services/api";
import toast from 'react-hot-toast'
import { orderServiceQueryKeys } from "./order-service-query-keys";

interface ResponseAxiosOccurrence extends ResponseAxiosDto<{ id: string , message: string}>{
  id: string;
}

export async function createOrderService(payload: ServiceOrderFormOneSchema){
  const response = await api.post<ResponseAxiosOccurrence>("/service-order" , payload)

  return response.data;
}

export function useCreateOrderService(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrderService,
    onMutate: async ()=>{
      await queryClient.cancelQueries({queryKey: orderServiceQueryKeys.all})
    },
    onSuccess: () => {
    },
    onError: (data: ErrorAxiosDto) => {
      const message = data.response?.data.message || "Ocorreu um erro ao adicionar estes dados.";
      toast.error(message);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: orderServiceQueryKeys.all,
      });
    },
  })
}