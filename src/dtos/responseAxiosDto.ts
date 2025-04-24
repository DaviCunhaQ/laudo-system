import { AxiosError } from "axios";

export interface errorComplement {
  code: string,
  expected: string,
  received: string,
  path: string[],
  message: string
}

export type ResponseAxiosDto<T> = {
  statusCode: number;
  body?: T;
  message?: string;
};

export type ErrorAxiosDto = AxiosError<{ message: string , errors?: string}>;
