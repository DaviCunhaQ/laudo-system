"use client";

import { useQuery } from "@tanstack/react-query";
import { ServiceOrderListSchema } from "../../dtos";
import { api } from "../../services/api";
import { orderServiceQueryKeys } from "./order-service-query-keys";

async function getOrderServices() {
  try {
    const response = await api.get<ServiceOrderListSchema[]>("/service-order");
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error("Erro inesperado ao buscar ordens de serviço.");
  }
}

export function useGetOrderServices() {
  const { data, error, isLoading } = useQuery({
    queryKey: orderServiceQueryKeys.all,
    queryFn: getOrderServices,
  });

  return { data, isLoading, error };
}
