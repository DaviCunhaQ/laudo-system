"use client";

import { useQuery } from "@tanstack/react-query";
import { ErrorAxiosDto, ListDraftSchema} from "../../dtos";
import { api } from "../../services/api";
import toast from "react-hot-toast";
import { DraftQueryKeys } from "./draft-query-keys";

async function showDraft(id: string) {
  try {
    const response = await api.get<ListDraftSchema>(`/drafts/${id}`);
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

export function useShowDraft(id: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: [DraftQueryKeys.detail, id], // O ID agora faz parte da queryKey
    queryFn: () => showDraft(id), // Passando o ID corretamente
    enabled: !!id, // Garante que a query só rode se o ID estiver definido
  });

  return { data, isLoading, error };
}

