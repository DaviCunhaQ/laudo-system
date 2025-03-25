"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  DriverSchema, ErrorAxiosDto, ResponseAxiosDto } from "../../dtos";
import { api } from "../../services/api";
import toast from 'react-hot-toast'
import { DriverQueryKeys } from "./drivers-and-vehicles-query-keys";
import { occurrenceQueryKeys } from "../occurrence/occurrence-query-keys";
export async function createDrivers(payload: DriverSchema[]){
  const response = await api.post<ResponseAxiosDto<{ id: string , message: string}>>("/drivers" , payload)
  
  return response.data
}

export function useCreateDrivers(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDrivers,
    onMutate: async ()=>{
      await queryClient.cancelQueries({queryKey: DriverQueryKeys.all})
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: occurrenceQueryKeys.all })
    },
    onError: (data: ErrorAxiosDto) => {
      const message = data.response?.data.message || "Ocorreu um erro ao adicionar estes dados.";
      toast.error(message);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: DriverQueryKeys.all,
      });
    },
  })
}