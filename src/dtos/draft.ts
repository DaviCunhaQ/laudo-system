import { z } from "zod";
import { ServiceOrderFormOneSchema, ServiceOrderFormThreeSchema, ServiceOrderFormTwoSchema, ServiceOrderSchema } from "./orderService";

export const DraftSchema = ServiceOrderSchema.partial();

export type DraftSchema = z.infer<typeof DraftSchema>

export const ViewDraftSchema = z.object({
  form1: ServiceOrderFormOneSchema.partial().optional(),
  form2: ServiceOrderFormTwoSchema.partial().optional(),
  form3: ServiceOrderFormThreeSchema.partial().optional(),
})

export type ViewDraftSchema = z.infer<typeof ViewDraftSchema>


export const ListDraftSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.string(),
  formData: ViewDraftSchema
})

export type ListDraftSchema = z.infer<typeof ListDraftSchema>