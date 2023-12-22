import {
  ApiItem,
  CommonSearchInput,
  FieldToStringFilters,
} from 'src/types/api-common.type';

export namespace Coupon {
  export enum TypesEnum {
    amount = 'amount',
    percent = 'percent',
  }

  interface Common {
    /** Coupon ID. */
    id: string;
    /** Coupon name. */
    name: string;
    /** Coupon description. */
    description?: string | null;
    /** Date corresponding to the expiration of the coupon. */
    expiration_date?: string | null;
    /** Number of times the coupon can be used when applied on a subscription. */
    redemption_limit?: number | null;
    /** UTC date time string in the ISO 8601 format, or milliseconds since the epoch. */
    created_at: string;
  }

  export interface Opt1 extends Common {
    /** Available options: "amount" */
    type: 'amount' | TypesEnum.amount;
    /** Amount to apply as a discount on the total amount (excluding taxes) of a subscription. Expressed in the currency's smallest unit. */
    discount_amount: number;
    /** Currency of the discount amount. */
    currency: string;
  }

  export interface Opt2 extends Common {
    /** Available options: "percent" */
    type: 'percent' | TypesEnum.percent;
    /** Percentage to apply as a discount on the amount (excluding taxes) of a product. */
    discount_percent: number;
  }

  export type Item = Opt1 | Opt2;

  export type CreateInput =
    | Omit<Opt1, 'id' | 'created_at'>
    | Omit<Opt2, 'id' | 'created_at'>;

  export type UpdateInput = CreateInput;

  export type SearchInput = CommonSearchInput;
}
