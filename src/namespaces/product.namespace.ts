import { CommonSearchInput } from 'src/types/api-common.type';
import { PriceConfiguration } from './price-configuration.namespace';

export namespace Product {
  interface Common {
    /** Product ID. */
    id: string;

    /** Product name. */
    name: string;

    /** Product description. */
    description: string;

    /** Key/value pairs to store any information you find useful. */
    properties: object | null;
  }

  export interface Opt1 extends Common {
    /** Product type. */
    type: 'flat_fee';

    /** Enable the product to be added as part of a subscription. */
    is_available_on_subscription: boolean;

    /** Enable the product to be billed at any time as a one-time payment. */
    is_available_on_demand: boolean;

    price_configurations: PriceConfiguration.Opt1[];
  }

  export interface Opt2 extends Common {
    /** Product type. */
    type: 'seat';

    price_configurations: Array<
      | PriceConfiguration.Opt2
      | PriceConfiguration.Opt3
      | PriceConfiguration.Opt4
    >;
  }

  export interface Opt3 extends Common {
    /** Product type. */
    type: 'dynamic';

    price_configurations: Array<
      | PriceConfiguration.Opt2
      | PriceConfiguration.Opt3
      | PriceConfiguration.Opt4
      | PriceConfiguration.Opt5
    >;
  }

  export type Item = Opt1 | Opt2 | Opt3;

  export type CreateInput = {
    type: 'flat_fee';

    name: string;

    description?: string;

    /**
     * @default true
     */
    is_available_on_demand?: boolean;

    /**
     * @default true
     */
    is_available_on_subscription?: boolean;

    /**
     * @deprecated please use is_available_on_subscription.
     */
    is_available_at_checkout?: boolean;

    price_configurations: {
      name: string;

      currency: string;

      coutry?: string | null;

      type: 'fee';

      prices: Array<{
        /**
         * @default 'fee'
         */
        type?: 'fee';

        amount: number;

        /**
         * @default 'once'
         */
        interval?: 'once' | 'weeks' | 'month' | 'year';
      }>;
    }[];
  };

  export type UpdateInput = {
    name: string;

    description?: string;

    properties?: object | null;
  };

  export type SearchInput = CommonSearchInput;
}
