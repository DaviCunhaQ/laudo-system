import PasswordValidator from "password-validator";
import { z } from "zod";

export const PasswordSchema = new PasswordValidator()
  .is()
  .min(8, "Senha deve conter no mínimo 8 caracteres")
  .is()
  .max(100, "Senha deve conter no máximo 100 caracteres")
  .has()
  .uppercase(1, "Senha deve conter letras maiúsculas")
  .has()
  .lowercase(1, "Senha deve conter letras minúsculas")
  .has()
  .digits(1, "Senha deve conter dígitos")
  .has()
  .not()
  .spaces(1, "Senha não deve conter espaços");

export const LoginSchema = z.object({
  email: z.string({ message: "Email inválido" }).email({ message: "Email inválido" }),
  password: z.string({ message: "Senha inválida" }).superRefine((val, ctx) => {
    const errors = PasswordSchema.validate(val, {
      details: true,
    }) as { message: string }[];

    errors.map((error) => {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: error.message,
      });
    });
  }),
});

export type LoginSchema = z.infer<typeof LoginSchema>;


export const CreateUserSchema = z.object({
  email: z.string({ message: "Email inválido" }).email({ message: "Email inválido" }),
  name: z.string({ message: "Nome inválido" }).min(3, { message: "Tamanho inválido" }),
  role: z.string({ message: "Cargo inválido" }).min(3, { message: "Tamanho inválido" }),
  password: LoginSchema.shape.password,
});

export type CreateUserSchema = z.infer<typeof CreateUserSchema>;

export const ListUserSchema = z.array(z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  role: z.string(),
  password: LoginSchema.shape.password,
}))

export type ListUserSchema = z.infer<typeof ListUserSchema>;

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}