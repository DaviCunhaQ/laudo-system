"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorAxiosDto, ResponseAxiosDto } from "../../dtos";
import { api } from "../../services/api";
import toast from 'react-hot-toast'
import { DriverQueryKeys } from "./drivers-and-vehicles-query-keys";
import { occurrenceQueryKeys } from "../occurrence/occurrence-query-keys";

interface ResponseAxiosOccurrence extends ResponseAxiosDto<{ id: string , message: string}>{
  id: string;
}

export async function deleteDriver(id: string){
  const response = await api.delete<ResponseAxiosOccurrence>(`/drivers/${id}`)

  return response.data;
}

export function useDeleteDriver(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDriver,
    onMutate: async ()=>{
      await queryClient.cancelQueries({queryKey: DriverQueryKeys.all})
      await queryClient.refetchQueries({queryKey: occurrenceQueryKeys.all})
    },
    onSuccess: (data) => {
      const message = data?.message || "Motorista deletado com sucesso.";
      toast.success(message);
    },
    onError: (data: ErrorAxiosDto) => {
      const message = data.response?.data.message || "Ocorreu um erro ao deletar o motorista.";
      toast.error(message);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: DriverQueryKeys.all,
      });
    },
  })
}