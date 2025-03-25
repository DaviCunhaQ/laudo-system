"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorAxiosDto, LocationSchema, ResponseAxiosDto } from "../../dtos";
import { api } from "../../services/api";
import toast from 'react-hot-toast'
import { locationQueryKeys } from "./location-query-keys";

interface ResponseAxiosOccurrence extends ResponseAxiosDto<{ id: string , message: string}>{
  id: string;
}

export async function createLocation(payload: LocationSchema){
  const response = await api.post<ResponseAxiosOccurrence>("/locations" , payload)

  return response.data;
}

export function useCreateLocation(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLocation,
    onMutate: async ()=>{
      await queryClient.cancelQueries({queryKey: locationQueryKeys.all})
    },
    onSuccess: () => {
    },
    onError: (data: ErrorAxiosDto) => {
      const message = data.response?.data.message || "Ocorreu um erro ao adicionar estes dados.";
      toast.error(message);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: locationQueryKeys.all,
      });
    },
  })
}