import { AxiosError } from "axios";

export type ResponseAxiosDto<T> = {
  statusCode: number;
  body?: T;
  message?: string;
};

export type ErrorAxiosDto = AxiosError<{ message: string }>;
