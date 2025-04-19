import { z } from "zod";

export const ServiceOrderSchema = z.object({
  company: z.string(),
  status: z.string(),
  order_number: z.string(),
  order_type: z.string().uuid(),
  client_name: z.string(),
  city: z.string().uuid(),
  hello_message: z.string().optional(),
  form_message: z.string().optional(),
  rgi_registration: z.string(),
  service_value: z.number().optional(),
  displacement_value: z.number().optional(),
  opening_date: z.string(),
  contact_name: z.string(),
  contact_number: z.string(),
  cep: z.string(),
  property_type: z.string().optional(),
  property_status: z.string().optional(),
  cpf: z.string().optional(),
  cnpj: z.string().optional(),
  registration_on_system: z.string().optional(),
  siopi_coincides: z.string().optional(),
  registration_type: z.string().optional(),
  registration_date: z.string().optional(),
  averbation_exists: z.boolean().optional(),
  mandatory_documents: z.array(z.string()).optional(),
  built_area_presents: z.string().optional(),
  dwell_registration_compare: z.array(z.string()).optional(),
  art_registration_compare: z.array(z.string()).optional(),
  dec_registration_compare: z.array(z.string()).optional(),
  street: z.string().optional(),
  number: z.number().optional(),
  neighborhood: z.string().optional(),
  block: z.string().optional(),
  batch: z.string().optional(),
  complement: z.string().optional(),
  coordenates: z.string().optional(),
  minimal_documentation: z.array(z.string()).optional(),
  pls_verifications: z.array(z.string()).optional(),
  pls_built_situation: z.string().optional(),
  total_measured: z.number().int().optional(),
  more_accurate_informations: z.array(z.string()).optional(),
  mandatory_documents_to_b: z.array(z.string()).optional(),
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
  order_type: z.string({required_error: "O campo não pode estar vazio"}).uuid().min(1, "O campo não pode estar vazio."),
  client_name: z.string({required_error: "O campo não pode estar vazio"}).min(1, "O campo não pode estar vazio."),
  city: z.string({required_error: "O campo não pode estar vazio"}).uuid().min(1, "O campo não pode estar vazio."),
  rgi_registration: z.string({required_error: "O campo não pode estar vazio"}).min(1, "O campo não pode estar vazio."),
  service_value: z.number().optional(),
  displacement_value: z.number().optional(),
  opening_date: z.string({required_error: "O campo não pode estar vazio"}).min(10, "Insira uma data válida."),
  contact_name: z.string({required_error: "O campo não pode estar vazio"}).min(1, "O campo não pode estar vazio."),
  contact_number: z.string({required_error: "O campo não pode estar vazio"}).min(15, "Insira um número de telefone válido."),
  cep: z.string({required_error: "O campo não pode estar vazio"}).min(1, "O campo não pode estar vazio."),
  form_link: z.string({required_error: "O campo não pode estar vazio"}).min(1, "O campo não pode estar vazio.")
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
  registration_date: z.string().optional(),
  averbation_exists: z.boolean().optional(),
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
  mandatory_documents_to_b: z.array(z.string()).optional(),
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
  street: z.string({required_error: "O campo não pode estar vazio"}).min(1, "O campo não pode estar vazio."),
  number: z.number({required_error: "O campo não pode estar vazio"}).min(1, "O campo não pode estar vazio."),
  neighborhood: z.string({required_error: "O campo não pode estar vazio"}).min(1, "O campo não pode estar vazio."),
  block: z.string({required_error: "O campo não pode estar vazio"}).min(1, "O campo não pode estar vazio."),
  batch: z.string({required_error: "O campo não pode estar vazio"}).min(1, "O campo não pode estar vazio."),
  complement: z.string({required_error: "O campo não pode estar vazio"}).min(1, "O campo não pode estar vazio."),
  coordenates: z.string({required_error: "O campo do mapa não pode estar vazio"}).min(1, "O campo não pode estar vazio.")
})

export type ServiceOrderFormThreeSchema = z.infer<typeof ServiceOrderFormThreeSchema>

export const ServiceOrderListSchema = z.object({
  id: z.string().uuid(),
  company: z.string(),
  status: z.string(),
  order_number: z.string(),
  date_expire: z.string(),
  order_type: z.string().uuid(),
  client_name: z.string(),
  city: z.string().uuid(),
  hello_message: z.string().optional(),
  form_message: z.string().optional(),
  rgi_registration: z.string(),
  service_value: z.number().optional(),
  displacement_value: z.number().optional(),
  opening_date: z.string(),
  contact_name: z.string(),
  contact_number: z.string(),
  cep: z.string(),
  property_type: z.string().optional(),
  property_status: z.string().optional(),
  cpf: z.string().optional(),
  cnpj: z.string().optional(),
  registration_on_system: z.string().optional(),
  siopi_coincides: z.string().optional(),
  registration_type: z.string().optional(),
  registration_date: z.string().optional(),
  averbation_exists: z.boolean().optional(),
  mandatory_documents: z.array(z.string()).optional(),
  built_area_presents: z.string().optional(),
  dwell_registration_compare: z.array(z.string()).optional(),
  art_registration_compare: z.array(z.string()).optional(),
  dec_registration_compare: z.array(z.string()).optional(),
  street: z.string().optional(),
  number: z.number().optional(),
  neighborhood: z.string().optional(),
  block: z.string().optional(),
  batch: z.string().optional(),
  complement: z.string().optional(),
  coordenates: z.string().optional(),
  minimal_documentation: z.array(z.string()).optional(),
  pls_verifications: z.array(z.string()).optional(),
  pls_built_situation: z.string().optional(),
  total_measured: z.number().int().optional(),
  more_accurate_informations: z.array(z.string()).optional(),
  mandatory_documents_to_b: z.array(z.string()).optional(),
  pci_verifications: z.array(z.string()).optional(),
  pci_art_compare: z.array(z.string()).optional(),
  project_permit_verifications: z.array(z.string()).optional(),
  built_area: z.number().optional(),
  terrain_area: z.number().optional(),
  rooms_number: z.number().int().optional(),
  bathrooms_number: z.number().int().optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type ServiceOrderListSchema = z.infer<typeof ServiceOrderListSchema>

export const ChangeStatusSchema = z.object({
  status: z.string()
})

export type ChangeStatusSchema = z.infer<typeof ChangeStatusSchema>

export const UpdateMessageSchema = z.object({
  hello_message: z.string().min(1, "O campo não pode estar vazio."),
  form_message: z.string().min(1, "O campo não pode estar vazio.")
})

export type UpdateMessageSchema = z.infer<typeof UpdateMessageSchema>