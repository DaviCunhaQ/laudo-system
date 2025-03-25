import { z } from "zod";

export const DraftSchema = z.object({
  form1: z.object({
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
  
  
  }).optional(),
  form2: z.object({
    occurrenceId: z
      .string()
      .cuid({ message: 'O ID da ocorrência deve ser um CUID válido.' }),
    street: z.string().min(1, { message: 'O nome da rua é obrigatório.' }),
    number: z.string().optional(),
    neighborhood: z.string().optional(),
    city: z.string().min(1, { message: 'O nome da cidade é obrigatório.' }),
    state: z.string().min(1, { message: 'O estado é obrigatório.' }),
    geolocation: z
      .string()
      .min(1, { message: 'A geolocalização é obrigatória.' }),
    reference: z.string().optional(),
  }).optional(),
  form3: z.object({
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
  }).optional(),
  form4: z.object({participants: z.array(z.object({
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
  }))}).optional(),
  form5: z.object({
    authorities: z.array(z.object({
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
    }))
  }).optional()
})

export type DraftSchema = z.infer<typeof DraftSchema>

export const ViewDraftSchema = z.object({
  form1: z.object({
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
  
  
  }).optional(),
  form2: z.object({
    occurrenceId: z
      .string()
      .cuid({ message: 'O ID da ocorrência deve ser um CUID válido.' }),
    street: z.string().min(1, { message: 'O nome da rua é obrigatório.' }),
    number: z.string().optional(),
    neighborhood: z.string().optional(),
    city: z.string().min(1, { message: 'O nome da cidade é obrigatório.' }),
    state: z.string().min(1, { message: 'O estado é obrigatório.' }),
    geolocation: z
      .string()
      .min(1, { message: 'A geolocalização é obrigatória.' }),
    reference: z.string().optional(),
  }).optional(),
  form3: z.object({
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
  }).optional(),
  form4: z.array(z.object({
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
  })).optional(),
  form5: z.object({
    authorities: z.array(z.object({
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
    }))
  }).optional()
})

export type ViewDraftSchema = z.infer<typeof ViewDraftSchema>


export const ListDraftSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.string(),
  formData: ViewDraftSchema
})

export type ListDraftSchema = z.infer<typeof ListDraftSchema>