"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";

export type CitySchema = {
  id: string;
  displacement_value: number;
  name: string;
  identify: string;
}

const cityQueryKeys = {
  all: ["cities"],
  lists: () => [...cityQueryKeys.all, "list"],
  list: (filters: Record<string, any>) => [...cityQueryKeys.lists(), { filters }],
  details: () => [...cityQueryKeys.all, "detail"],
  detail: (id: string | number) => [...cityQueryKeys.details(), id],
};


async function getCities() {
  try {
    const response = await api.get<CitySchema[]>("/cities");
    return response.data;
  } catch (error) {
    throw new Error("Erro inesperado ao buscar as cidades.");
  }
}

export function useGetCities() {
  const { data, error, isLoading } = useQuery({
    queryKey: cityQueryKeys.all,
    queryFn: getCities,
  });

  return { data, isLoading, error };
}
