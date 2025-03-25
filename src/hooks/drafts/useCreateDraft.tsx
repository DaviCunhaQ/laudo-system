"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DraftSchema, ErrorAxiosDto, ResponseAxiosDto } from "../../dtos";
import { api } from "../../services/api";
import { DraftQueryKeys } from "./draft-query-keys";
import toast from "react-hot-toast";

export async function createDraft({ payload, id }: { payload: DraftSchema; id: string | undefined }) {
  const response = await api.post<ResponseAxiosDto<{ id: string; message: string }>>(id!==undefined?`/drafts?id=${id}`:'/drafts', {
    formData: {
      form1: payload.form1,
      form2: payload.form2,
      form3: payload.form3,
      form4: payload.form4?.participants,
      form5: payload.form5?.authorities
    }
  });

  return response.data;
}

export function useCreateDraft() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createDraft,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: DraftQueryKeys.all });
    },
    onSuccess: () => {},
    onError: (data: ErrorAxiosDto) => {
      toast.error(data.message);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: DraftQueryKeys.all });
    },
  });
}
