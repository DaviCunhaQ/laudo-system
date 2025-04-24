"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorAxiosDto, errorComplement, ResponseAxiosDto, ServiceOrderFormOneSchema } from "../../dtos";
import { api } from "../../services/api";
import toast from 'react-hot-toast'
import { orderServiceQueryKeys } from "./order-service-query-keys";

function generateToastByErrors( errors: errorComplement[] ){
  const expireNumberOfErrors = errors.length > 3
  let finalMessage = ""
  if(expireNumberOfErrors){
    finalMessage = "3 ou mais campos inválidos."
  }else{
    const errosWithoutFilter = errors.map((item)=>item.path[0])
    const errorsList =  errosWithoutFilter.filter((error)=>error!=="cep")
    finalMessage = `Erro nos campos: ${errorsList[0]}${errorsList[1] ? `, ${errorsList[1]}` : ""}${errorsList[2] ? `, ${errorsList[2]}` : ""}`
  }

  return finalMessage
  
}

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
      setTimeout(()=>{
        if(data.response?.data.errors){
          const errors = JSON.parse(data.response?.data.errors)
          const messageErrors = generateToastByErrors(errors)
          toast.error(messageErrors)
        }
      },300)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: orderServiceQueryKeys.all,
      });
    },
  })
}