"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorAxiosDto, ResponseAxiosDto, VehicleSchema } from "../../dtos";
import { api } from "../../services/api";
import toast from 'react-hot-toast'
import {  VehicleQueryKeys } from "./drivers-and-vehicles-query-keys";
import { occurrenceQueryKeys } from "../occurrence/occurrence-query-keys";


export async function createVehicles(payload: VehicleSchema[]){
  const response = await api.post<ResponseAxiosDto<{ id: string , message: string}>>("/vehicles" , payload)
  
  return response.data
}

export function useCreateVehicles(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createVehicles,
    onMutate: async ()=>{
      await queryClient.cancelQueries({queryKey: VehicleQueryKeys.all})
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: occurrenceQueryKeys.all })
    },
    onError: (data: ErrorAxiosDto) => {
      const message = data.response?.data.message || "Ocorreu um erro ao adicionar estes dados.";
      toast.error(message);
    },
    onSettled: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: VehicleQueryKeys.all }),
      ]);
    },
    
  })
}