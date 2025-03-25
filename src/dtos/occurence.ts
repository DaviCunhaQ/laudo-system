import { z } from "zod";

export const OccurrenceSchema = z.object({
  id: z.string().cuid(),
  category: z.string({required_error: "O campo não pode estar vazio"}).min(1, "O campo não pode estar vazio."),
  subcategory: z.string().nullable(),
  description: z.string().min(1, "O campo não pode estar vazio."),
  comments: z.string().min(1, "O campo não pode estar vazio."),
  details: z.string().min(1, "O campo não pode estar vazio."),
  accompaniment: z.string().min(1, "O campo não pode estar vazio."),
  status: z.enum(['ABERTO', 'EM_PROGRESSO', 'ENCERRADO'], {
    errorMap: () => ({
      message: 'O campo não pode estar vazio.',
    }),
  }),
  materialDamage: z.string().min(1, "O campo não pode estar vazio."),
  trafficImpact: z.enum(
    [
      'BLOQUEIO_PARCIAL',
      'BLOQUEIO_TOTAL',
      'CONGESTIONAMENTO_INTENSO',
      'CONGESTIONAMENTO_LEVE',
      'CONGESTIONAMENTO_MODERADO',
      'DESVIO_NECESSARIO',
      'SEM_IMPACTO',
      'TRANSITO_LENTO',
    ],
    {
      errorMap: () => ({
        message:
          'O campo não pode estar vazio.',
      }),
    },
  ),
  registeredAt: z
  .string()
  .min(1, "O campo não pode estar vazio.")
  .refine((val) => !isNaN(Date.parse(val)), {
    message: "O campo registeredAt deve ser uma data e hora válida",
  })
  .transform((val) => new Date(val).toISOString()),


});

export type OccurrenceSchema = z.infer<typeof OccurrenceSchema>

export const LocationSchema = z.object({
  occurrenceId: z
    .string()
    .cuid({ message: 'O ID da ocorrência deve ser um CUID válido.' }),
  street: z.string().min(1, { message: 'O nome da rua é obrigatório.' }),
  number: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().min(1, { message: 'O nome da cidade é obrigatório.' }),
  state: z.string().min(1, { message: 'O estado é obrigatório.' }),
  geolocation: z
    .string({required_error: "Selecione uma localização."})
    .min(1, { message: 'A geolocalização é obrigatória.' }),
  reference: z.string().optional(),
});

export type LocationSchema = z.infer<typeof LocationSchema>

export const UpdateLocationSchema = z.object({
  id: z.string().cuid(),
  occurrenceId: z
    .string()
    .cuid({ message: 'O ID da ocorrência deve ser um CUID válido.' }),
  street: z.string().min(1, { message: 'O nome da rua é obrigatório.' }),
  number: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().min(1, { message: 'O nome da cidade é obrigatório.' }),
  state: z.string().min(1, { message: 'O estado é obrigatório.' }),
  geolocation: z
    .string({required_error: "Selecione uma localização."})
    .min(1, { message: 'A geolocalização é obrigatória.' }),
  reference: z.string().optional(),
});

export type UpdateLocationSchema = z.infer<typeof UpdateLocationSchema>

export const DriverSchema = z.object({
  occurrenceId: z
    .string()
    .cuid({ message: 'O ID da ocorrência deve ser um CUID válido.' }),
  vehicleId: z.string().cuid({
    message: 'O ID do veículo deve ser um CUID válido.',
  }),
  name: z.string().min(1, { message: 'O nome do motorista é obrigatório.' }),
  contact: z.string().optional(),
  isLicensed: z.boolean({
    message: 'A informação sobre a licença é obrigatória.',
  }),
});

export type DriverSchema = z.infer<typeof DriverSchema>

export const UpdateDriverSchema = z.object({
  id: z.string().cuid(),
  occurrenceId: z
    .string()
    .cuid({ message: 'O ID da ocorrência deve ser um CUID válido.' }),
  vehicleId: z.string().cuid({
    message: 'O ID do veículo deve ser um CUID válido.',
  }),
  name: z.string().min(1, { message: 'O nome do motorista é obrigatório.' }),
  contact: z.string().optional(),
  isLicensed: z.boolean({
    message: 'A informação sobre a licença é obrigatória.',
  }),
});

export type UpdateDriverSchema = z.infer<typeof UpdateDriverSchema>

export const VehicleSchema = z.object({
  id: z.string().cuid(),
  occurrenceId: z.string().cuid(),
  plate: z.string(),
  model: z.string(),
  color: z.string(),
});

export type VehicleSchema = z.infer<typeof VehicleSchema>


export const DriverAndVehicleSchema = z.object({
  vehicles: z.array(z.object({
    id: z.string().cuid(),
    occurrenceId: z.string().cuid(),
    plate: z.string(),
    model: z.string(),
    color: z.string(),
  })),
  drivers: z.array(z.object({
    id: z.string().cuid(),
    occurrenceId: z
      .string()
      .cuid({ message: 'O ID da ocorrência deve ser um CUID válido.' }),
    vehicleId: z.string().cuid({
      message: 'O ID do veículo deve ser um CUID válido.',
    }),
    name: z.string().min(1, { message: 'O nome do motorista é obrigatório.' }),
    contact: z.string().optional(),
    isLicensed: z.boolean({
      message: 'A informação sobre a licença é obrigatória.',
    }),
  })).optional(),
})

export type DriverAndVehicleSchema = z.infer<typeof DriverAndVehicleSchema>


export const IncidentParticipantSchema = z.object({
  occurrenceId: z
    .string()
    .cuid({ message: 'O ID da ocorrência deve ser um CUID válido.' }),
  name: z.string().min(1, { message: 'O nome é obrigatório.' }),
  contact: z.string().optional(),
  description: z.string().optional(),
  participation: z.enum(['PASSAGEIRO', 'PEDESTRE', 'TESTEMUNHA'], {
    errorMap: () => ({
      message:
        'O campo não pode estar vazio.',
    }),
  }),
  status: z.enum(['FERIDO', 'OBITO', 'SEM_FERIMENTOS'] , {errorMap: ()=>({message: 'O campo não pode estar vazio.'})}).optional(),
});

export type IncidentParticipantSchema = z.infer<typeof IncidentParticipantSchema>

export const ParticipantFormSchema = z.object({participants: z.array(IncidentParticipantSchema)})

export type ParticipantFormSchema = z.infer<typeof ParticipantFormSchema>

export const UpdateIncidentParticipantSchema = z.object({
  id: z.string().cuid(),
  occurrenceId: z
    .string()
    .cuid({ message: 'O ID da ocorrência deve ser um CUID válido.' }),
  name: z.string().min(1, { message: 'O nome é obrigatório.' }),
  contact: z.string().optional(),
  description: z.string().optional(),
  participation: z.enum(['PASSAGEIRO', 'PEDESTRE', 'TESTEMUNHA'], {
    errorMap: () => ({
      message:
        'O campo não pode estar vazio.',
    }),
  }),
  status: z.enum(['FERIDO', 'OBITO', 'SEM_FERIMENTOS'] , {errorMap: ()=>({message: 'O campo não pode estar vazio.'})}).optional(),
});

export type UpdateIncidentParticipantSchema = z.infer<typeof UpdateIncidentParticipantSchema>

export const UpdateParticipantFormSchema = z.object({participants: z.array(UpdateIncidentParticipantSchema)})

export type UpdateParticipantFormSchema = z.infer<typeof UpdateParticipantFormSchema>

export const AuthoritySchema = z.object({
  occurrenceId: z
    .string()
    .cuid({ message: 'O ID da ocorrência deve ser um CUID válido.' }),
  name: z.string().min(1, { message: 'O nome da autoridade é obrigatório.' }),
  serviceTime: z
    .string()
    .min(1, { message: 'O tempo de serviço é obrigatório.' }),
  providences: z
    .string()
    .min(1, { message: 'As providências são obrigatórias.' }),
});

export type AuthoritySchema = z.infer<typeof AuthoritySchema>

export const AuthoritiesFormSchema = z.object({
  authorities: z.array(AuthoritySchema)
})

export type AuthoritiesFormSchema = z.infer<typeof AuthoritiesFormSchema>


export const UpdateAuthoritySchema = z.object({
  id: z.string().cuid(), 
  occurrenceId: z
    .string()
    .cuid({ message: 'O ID da ocorrência deve ser um CUID válido.' }),
  name: z.string().min(1, { message: 'O nome da autoridade é obrigatório.' }),
  serviceTime: z
    .string()
    .min(1, { message: 'O tempo de serviço é obrigatório.' }),
  providences: z
    .string()
    .min(1, { message: 'As providências são obrigatórias.' }),
});

export type UpdateAuthoritySchema = z.infer<typeof UpdateAuthoritySchema>

export const UpdateAuthoritiesFormSchema = z.object({
  authorities: z.array(UpdateAuthoritySchema)
})

export type UpdateAuthoritiesFormSchema = z.infer<typeof UpdateAuthoritiesFormSchema>


export const ViewOccurenceSchema = z.object({
  id: z.string().cuid(),
  category: z.string().min(1, "O campo não pode estar vazio."),
  subcategory: z.string().nullable(),
  description: z.string().min(1, "O campo não pode estar vazio."),
  comments: z.string().min(1, "O campo não pode estar vazio."),
  details: z.string().min(1, "O campo não pode estar vazio."),
  accompaniment: z.string().min(1, "O campo não pode estar vazio."),
  status: z.enum(['ABERTO', 'EM_PROGRESSO', 'ENCERRADO'], {
    errorMap: () => ({
      message: 'O campo não pode estar vazio.',
    }),
  }),
  materialDamage: z.string().min(1, "O campo não pode estar vazio."),
  trafficImpact: z.enum(
    [
      'BLOQUEIO_PARCIAL',
      'BLOQUEIO_TOTAL',
      'CONGESTIONAMENTO_INTENSO',
      'CONGESTIONAMENTO_LEVE',
      'CONGESTIONAMENTO_MODERADO',
      'DESVIO_NECESSARIO',
      'SEM_IMPACTO',
      'TRANSITO_LENTO',
    ],
    {
      errorMap: () => ({
        message:
          'O campo não pode estar vazio.',
      }),
    },
  ),
  registeredAt: z
  .string()
  .min(1, "O campo não pode estar vazio.")
  .refine((val) => !isNaN(Date.parse(val)), {
    message: "O campo registeredAt deve ser uma data e hora válida",
  })
  .transform((val) => new Date(val).toISOString()),
  location: UpdateLocationSchema,
  vehicles: z.array(VehicleSchema),
  drivers: z.array(UpdateDriverSchema),
  participants: z.array(UpdateIncidentParticipantSchema),
  authorities: z.array(UpdateAuthoritySchema)
});

export type ViewOccurenceSchema = z.infer<typeof ViewOccurenceSchema>