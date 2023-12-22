import { PaymentMethodsEnum } from 'src/types/api-common.type';

export namespace Payment {
  export namespace CreateInput {
    interface CommonInput {
      type: 'one_time';

      customer_id: string;

      items: {
        id: string;

        name: string;

        /** Monetary amount in currency's smallest unit. */
        amount: number;
      }[];

      purchase_order?: string | null;
    }

    export interface Opt1 extends CommonInput {
      charging_method: 'immediately';
    }

    export interface Opt2 extends CommonInput {
      charging_method: 'checkout';

      available_payment_methods: PaymentMethodsEnum[];
    }

    export type Input = Opt1 | Opt2;
  }

  export type Item = {
    /** Payment invoice ID. */
    invoice_id: string;

    /** One-time payment checkout session. */
    checkout?: {
      /** Checkout session ID. */
      id: string;

      /** URL to access the checkout session. Only defined if the status is opened. */
      url: string;
    };
  };
}
