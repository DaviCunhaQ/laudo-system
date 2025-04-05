import { z } from "zod";

export const ServiceOrderSchema = z.object({
  company: z.string(),
  order_number: z.number().int(),
  order_type: z.string().uuid(),
  service_value: z.string({required_error: "O campo não pode estar vazio"}).optional(),
  client_name: z.string(),
  city: z.string().uuid(),
  rgi_registration: z.string(),
  opening_date: z.string(),
  contact_name: z.string(),
  contact_number: z.string(),
  property_type: z.string().optional(),
  property_status: z.string().optional(),
  cpf: z.string().optional(),
  cnpj: z.string().optional(),
  registration_on_system: z.string().optional(),
  siopi_coincides: z.string().optional(),
  registration_type: z.string().optional(),
  registration_date: z.string(),
  averbation_exists: z.boolean(),
  mandatory_documents: z.array(z.string()).optional(),
  built_area_presents: z.string().optional(),
  dwell_registration_compare: z.array(z.string()).optional(),
  art_registration_compare: z.array(z.string()).optional(),
  dec_registration_compare: z.array(z.string()).optional(),
  cep: z.string(),
  street: z.string(),
  number: z.string(),
  neighborhood: z.string(),
  block: z.string(),
  batch: z.string(),
  complement: z.string(),
  coordenates: z.string(),
  minimal_documentation: z.array(z.string()).optional(),
  pls_verifications: z.array(z.string()).optional(),
  pls_built_situation: z.string().optional(),
  total_measured: z.number().int().optional(),
  more_accurate_informations: z.array(z.string()).optional(),
  pci_verifications: z.array(z.string()).optional(),
  pci_art_compare: z.array(z.string()).optional(),
  project_permit_verifications: z.array(z.string()).optional(),
  built_area: z.number().optional(),
  terrain_area: z.number().optional(),
  rooms_number: z.number().int().optional(),
  bathrooms_number: z.number().int().optional(),
});

export type ServiceOrderSchema = z.infer<typeof ServiceOrderSchema>


export const ServiceOrderFormOneSchema = z.object({
  company: z.string({required_error: "O campo não pode estar vazio"}).min(1, "O campo não pode estar vazio."),
  order_number: z.string({required_error: "O campo não pode estar vazio"}).min(1, "O campo não pode estar vazio."),
  order_type: z.string({required_error: "O campo não pode estar vazio"}).min(1, "O campo não pode estar vazio.").uuid(),
  client_name: z.string({required_error: "O campo não pode estar vazio"}).min(1, "O campo não pode estar vazio."),
  city: z.string({required_error: "O campo não pode estar vazio"}).min(1, "O campo não pode estar vazio.").uuid(),
  rgi_registration: z.string({required_error: "O campo não pode estar vazio"}).min(1, "O campo não pode estar vazio."),
  opening_date: z.string({required_error: "O campo não pode estar vazio"}).min(1, "O campo não pode estar vazio."),
  contact_name: z.string({required_error: "O campo não pode estar vazio"}).min(1, "O campo não pode estar vazio."),
  contact_number: z.string({required_error: "O campo não pode estar vazio"}).min(1, "O campo não pode estar vazio."),
  service_value: z.string().optional(),
  displacement_value: z.string().optional()
})

export type ServiceOrderFormOneSchema = z.infer<typeof ServiceOrderFormOneSchema>

export const ServiceOrderFormTwoSchema = z.object({
  property_type: z.string().optional(),
  property_status: z.string().optional(),
  cpf: z.string().optional(),
  cnpj: z.string().optional(),
  registration_on_system: z.string().optional(),
  siopi_coincides: z.string().optional(),
  registration_type: z.string().optional(),
  registration_date: z.string(),
  averbation_exists: z.boolean(),
  mandatory_documents: z.array(z.string()).optional(),
  built_area_presents: z.string().optional(),
  dwell_registration_compare: z.array(z.string()).optional(),
  art_registration_compare: z.array(z.string()).optional(),
  dec_registration_compare: z.array(z.string()).optional(),
  minimal_documentation: z.array(z.string()).optional(),
  pls_verifications: z.array(z.string()).optional(),
  pls_built_situation: z.string().optional(),
  total_measured: z.number().int().optional(),
  more_accurate_informations: z.array(z.string()).optional(),
  pci_verifications: z.array(z.string()).optional(),
  pci_art_compare: z.array(z.string()).optional(),
  project_permit_verifications: z.array(z.string()).optional(),
  built_area: z.number().optional(),
  terrain_area: z.number().optional(),
  rooms_number: z.number().int().optional(),
  bathrooms_number: z.number().int().optional(),
})

export type ServiceOrderFormTwoSchema = z.infer<typeof ServiceOrderFormTwoSchema>

export const ServiceOrderFormThreeSchema = z.object({
  cep: z.string(),
  street: z.string(),
  number: z.string(),
  neighborhood: z.string(),
  block: z.string(),
  batch: z.string(),
  complement: z.string(),
  coordenates: z.string()
})

export type ServiceOrderFormThreeSchema = z.infer<typeof ServiceOrderFormThreeSchema>