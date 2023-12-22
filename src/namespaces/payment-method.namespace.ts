import { PaymentMethodsEnum } from 'src/types/api-common.type';

export namespace PaymentMethod {
  export type Opt1 = {
    id: string;
    type: PaymentMethodsEnum.card;
    last_4_digits?: number | null;
    expiration_date?: string | null;
    brand?: string | null;
  };

  export type Opt2 = {
    id: string;
    type:
      | PaymentMethodsEnum.direct_debit
      | PaymentMethodsEnum.direct_debit_ach
      | PaymentMethodsEnum.direct_debit_bacs
      | PaymentMethodsEnum.direct_debit_sepa;
    account_number_ending?: number | null;
  };

  export type Opt3 = {
    id: string;
    type: PaymentMethodsEnum.transfer;
  };

  export type Item = Opt1 | Opt2 | Opt3;
}
