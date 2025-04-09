"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorAxiosDto, ResponseAxiosDto, ServiceOrderSchema } from "../../dtos";
import { api } from "../../services/api";
import toast from 'react-hot-toast'
import { orderServiceQueryKeys } from "./order-service-query-keys";

interface ResponseAxiosOccurrence extends ResponseAxiosDto<{ id: string , message: string}>{
  id: string;
}

interface updateOrderServiceSchema extends Partial<ServiceOrderSchema> {
  id: string;
}

export async function updateOrderService(payload: updateOrderServiceSchema){
  const {id, ...rest} = payload
  const response = await api.put<ResponseAxiosOccurrence>(`/service-order/${payload.id}` , rest)

  return response.data;
}

export function useUpdateOrderService(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOrderService,
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