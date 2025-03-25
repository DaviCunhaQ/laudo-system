"use client";

import { useQuery } from "@tanstack/react-query";
import { OccurrenceSchema } from "../../dtos";
import { api } from "../../services/api";
import { occurrenceQueryKeys } from "./occurrence-query-keys";

async function getOccurrences() {
  try {
    const response = await api.get<{occurrences: OccurrenceSchema[]}>("/occurrences");
    return response.data.occurrences;
  } catch (error) {
    throw new Error("Erro inesperado ao buscar ocorrências.");
  }
}

export function useGetOccurrences() {
  const { data, error, isLoading } = useQuery({
    queryKey: occurrenceQueryKeys.all,
    queryFn: getOccurrences,
  });

  return { data, isLoading, error };
}
