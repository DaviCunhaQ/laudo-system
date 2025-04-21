"use client";

import { useQuery } from "@tanstack/react-query";
import { ErrorAxiosDto, ServiceOrderListSchema } from "../../dtos";
import { api } from "../../services/api";
import { orderServiceQueryKeys } from "./order-service-query-keys";

async function showOrderService(id: string) {
  try {
    const response = await api.get<ServiceOrderListSchema>(`/service-order/${id}`);
    return response.data;
  } catch (error) {
    if ((error as ErrorAxiosDto).response) {
      const message = (error as ErrorAxiosDto).response?.data.message || "Ocorreu um erro ao buscar a ordem de serviço.";
      console.error(message);
      throw new Error(message);
    } else {
      throw new Error("Erro inesperado ao buscar a ordem de serviço.");
    }
  }
}

export function useShowOrderService(id: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: [orderServiceQueryKeys.detail, id], // O ID agora faz parte da queryKey
    queryFn: () => showOrderService(id), // Passando o ID corretamente
    enabled: !!id, // Garante que a query só rode se o ID estiver definido
  });

  return { data, isLoading, error };
}

