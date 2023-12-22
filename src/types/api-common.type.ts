export type ApiZodErrorType = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
};

export type ApiErrorType = {
  message: string;
};

export type ApiErrors = ApiZodErrorType | ApiErrorType;

export type ApiErrorResponseType<Err extends ApiErrors = ApiErrors> = {
  type: string;
  message: string;
  errors?: Err[];
  statusCode: number;
};

export interface ApiItem {
  id: string;
  created_at: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export type Address = {
  name: string;
  line1: string;
  /** Address second line (optional). */
  line2?: string | null;
  city: string;
  zip: string;
  /** Address state (only for US country). */
  state?: string | null;
  /** Two-letter country code in ISO format. See ISO 3166 Alpha 2. */
  country: string;
};

export enum PaymentMethodsEnum {
  card = 'card',
  direct_debit = 'direct_debit',
  direct_debit_ach = 'direct_debit_ach',
  direct_debit_bacs = 'direct_debit_bacs',
  direct_debit_sepa = 'direct_debit_sepa',
  transfer = 'transfer',
  external = 'external',
}

export enum ProvidersEnum {
  stripe = 'stripe',
  mollie = 'mollie',
  gocardless = 'gocardless',
  hubspot = 'hubspot',
  salesforce = 'salesforce',
}

export type ApiPaginatedResponse<T> = {
  data: T[];
  meta: {
    total: number;
    taken: number;
    skipped: number;
  };
};

// generic type for add prefix to keys
export type WithPrefix<T, P extends string> = {
  [K in keyof T as `${P}${Capitalize<string & K>}`]: T[K];
};

export type FieldToStringFilters<P extends string> = WithPrefix<
  {
    ''?: string;
    __not?: string;
    __isNull?: true;
    __isNotNull?: true;
    __equals?: string;
    __contains?: string;
    __startsWith?: string;
    __endsWith?: string;
  },
  P
>;

export type FieldToEnumFilters<P extends string, Enum> = WithPrefix<
  {
    ''?: Enum;
    __in?: Enum[] | Enum;
    __notIn?: Enum[] | Enum;
  },
  P
>;

export type FieldToDateFilters<P extends string> = WithPrefix<
  {
    ''?: string;
    __not?: string;
    __isNull?: true;
    __isNotNull?: true;
    __equals?: string;
    __lt?: string;
    __lte?: string;
    __gt?: string;
    __gte?: string;
  },
  P
>;

export type CommonSearchInput = {
  take?: number;
  skip?: number;
};
