"use client";

import { useQuery } from "@tanstack/react-query";
import { ErrorAxiosDto, ListDraftSchema } from "../../dtos";
import { api } from "../../services/api";
import toast from "react-hot-toast";
import { DraftQueryKeys } from "./draft-query-keys";

async function listDrafts() {
  try {
    const response = await api.get<ListDraftSchema[]>("/drafts");
    return response.data;
  } catch (error) {
    if ((error as ErrorAxiosDto).response) {
      const message = (error as ErrorAxiosDto).response?.data.message || "Ocorreu um erro ao buscar os rascunhos.";
      toast.error(message);
      throw new Error(message);
    } else {
      throw new Error("Erro inesperado ao buscar rascunhos.");
    }
  }
}

export function useListDrafts() {
  const { data, error, isLoading } = useQuery({
    queryKey: DraftQueryKeys.all,
    queryFn: listDrafts,
  });

  return { data, isLoading, error };
}
