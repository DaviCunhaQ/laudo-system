"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorAxiosDto, ResponseAxiosDto } from "../../dtos";
import { api } from "../../services/api";
import toast from 'react-hot-toast'
import { VehicleQueryKeys } from "./drivers-and-vehicles-query-keys";
import { occurrenceQueryKeys } from "../occurrence/occurrence-query-keys";

interface ResponseAxiosOccurrence extends ResponseAxiosDto<{ id: string , message: string}>{
  id: string;
}

export async function deleteVehicle(id: string){
  const response = await api.delete<ResponseAxiosOccurrence>(`/vehicles/${id}`)

  return response.data;
}

export function useDeleteVehicle(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVehicle,
    onMutate: async ()=>{
      await queryClient.cancelQueries({queryKey: VehicleQueryKeys.all})
      await queryClient.refetchQueries({queryKey: occurrenceQueryKeys.all})
    },
    onSuccess: (data) => {
      const message = data?.message || "Veículo deletado com sucesso.";
      toast.success(message);
    },
    onError: (data: ErrorAxiosDto) => {
      const message = data.response?.data.message || "Ocorreu um erro ao deletar o veículo.";
      toast.error(message);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: VehicleQueryKeys.all,
      });
    },
  })
}