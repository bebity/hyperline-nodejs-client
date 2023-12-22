import { AxiosError } from 'axios';
import { ApiErrorResponseType, ApiErrors } from './api-common.type';

export type ApiEnvironment = {
  main_api: string;
  events_ingestion_api: string;
};

export enum ApiEnvironmentsEnum {
  production = 'production',
  sandbox = 'sandbox',
}

export type Config = {
  environments: { [key in ApiEnvironmentsEnum]: ApiEnvironment };
};

export type HyperlineClientOptions = {
  api_key: string;
  events_ingestion_api_auth?: {
    username: string;
    password: string;
  };
  environment: keyof typeof ApiEnvironmentsEnum | ApiEnvironment;
};

export class HyperlineError extends Error {
  public isHyperlineError = true;

  constructor(
    public readonly message: string,
    public readonly api_error?: ApiErrorResponseType,
  ) {
    super(message);
  }

  static fromError(err: AxiosError | Error | unknown) {
    const isAxiosError = (err as AxiosError)?.isAxiosError;
    const isHyperlineError = (err as HyperlineError)?.isHyperlineError;
    if (isHyperlineError) {
      return err as HyperlineError;
    }
    const base_message = (err as Error)?.message || 'unknown error';
    const message = `[${isAxiosError ? 'API ERROR' : 'ERROR'}] ${base_message}`;
    return new HyperlineError(
      message,
      isAxiosError
        ? (err as AxiosError<ApiErrorResponseType>).response?.data
        : undefined,
    );
  }
}
