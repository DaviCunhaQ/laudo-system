"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorAxiosDto, ResponseAxiosDto } from "../../dtos";
import { api } from "../../services/api";
import toast from 'react-hot-toast'
import { orderServiceQueryKeys } from "./order-service-query-keys";

interface ResponseAxiosOccurrence extends ResponseAxiosDto<{ id: string , message: string}>{
  id: string;
}

export async function deleteOrderService(id: string){
  const response = await api.delete<ResponseAxiosOccurrence>(`/service-order/${id}`)

  return response.data;
}

export function useDeleteOrderService(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteOrderService,
    onMutate: async ()=>{
      await queryClient.cancelQueries({queryKey: orderServiceQueryKeys.all})
    },
    onSuccess: (data) => {
      const message = data?.message || "Ordem de serviço deletada com sucesso.";
      toast.success(message);
    },
    onError: (data: ErrorAxiosDto) => {
      const message = data.response?.data.message || "Ocorreu um erro ao deletar a ordem de serviço.";
      toast.error(message);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: orderServiceQueryKeys.all,
      });
    },
  })
}