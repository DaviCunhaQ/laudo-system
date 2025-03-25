"use client";

import { useQuery } from "@tanstack/react-query";
import { ErrorAxiosDto, ViewOccurenceSchema } from "../../dtos";
import { api } from "../../services/api";
import { occurrenceQueryKeys } from "./occurrence-query-keys";
import toast from "react-hot-toast";

async function showOccurrence(id: string) {
  try {
    const response = await api.get<ViewOccurenceSchema>(`/occurrences/${id}`);
    return response.data;
  } catch (error) {
    if ((error as ErrorAxiosDto).response) {
      const message = (error as ErrorAxiosDto).response?.data.message || "Ocorreu um erro ao buscar a ocorrência.";
      toast.error(message);
      throw new Error(message);
    } else {
      throw new Error("Erro inesperado ao buscar a ocorrência.");
    }
  }
}

export function useShowOccurrence(id: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: [occurrenceQueryKeys.detail, id], // O ID agora faz parte da queryKey
    queryFn: () => showOccurrence(id), // Passando o ID corretamente
    enabled: !!id, // Garante que a query só rode se o ID estiver definido
  });

  return { data, isLoading, error };
}

