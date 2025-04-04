"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";

export type SoTypeSchema = {
  id: string;
  service_value: number | null;
  code: string;
  days_limit: number;
}

const soTypesQueryKeys = {
  all: ["service-order-types"],
  lists: () => [...soTypesQueryKeys.all, "list"],
  list: (filters: Record<string, any>) => [...soTypesQueryKeys.lists(), { filters }],
  details: () => [...soTypesQueryKeys.all, "detail"],
  detail: (id: string | number) => [...soTypesQueryKeys.details(), id],
};


async function getSoTypes() {
  try {
    const response = await api.get<SoTypeSchema[]>("/service-order-types");
    return response.data;
  } catch (error) {
    throw new Error("Erro inesperado ao buscar os tipos de ordens de serviço.");
  }
}

export function useGetSoTypes() {
  const { data, error, isLoading } = useQuery({
    queryKey: soTypesQueryKeys.all,
    queryFn: getSoTypes,
  });

  return { data, isLoading, error };
}
