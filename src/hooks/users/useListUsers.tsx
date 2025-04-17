"use client";

import { useQuery } from "@tanstack/react-query";
import { ListUserSchema } from "../../dtos";
import { api } from "../../services/api";
import { userQueryKeys } from "./user-query-keys";

async function listUsers() {
  try {
    const response = await api.get<ListUserSchema>("/users");
    return response.data;
  } catch (error) {
    throw new Error("Erro inesperado ao buscar usuários.");
  }
}

export function useListUsers() {
  const { data, error, isLoading } = useQuery({
    queryKey: userQueryKeys.all,
    queryFn: listUsers,
  });

  return { data, isLoading, error };
}
