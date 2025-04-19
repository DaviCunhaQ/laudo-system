import { z } from 'zod'

export const SendMessageSchema = z.object({
  number: z.string().min(1, { message: "Número é obrigatório" }),
  body: z.string().min(1, { message: "Mensagem é obrigatória" }),
})

export type SendMessageSchema = z.infer<typeof SendMessageSchema>