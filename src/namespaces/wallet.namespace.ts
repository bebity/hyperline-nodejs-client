import { ApiItem, CommonSearchInput } from 'src/types/api-common.type';

export namespace Wallet {
  export type Item = ApiItem & {
    id: string;

    customer_id: string;

    state: 'active' | 'paused';

    currency: string;

    balance: {
      units: number;
      amount: number;
    };

    /** Wallet projected balance. Automatically computed by Hyperline depending on the customer's active subscriptions and future payments. */
    projected_balance: {
      units: number;
      amount: number;
    };

    created_at: string;
  };

  export type SearchInput = {
    customer_id?: string | null;
  };

  export type GetWalletTransactionsInput = CommonSearchInput;

  export type WalletTransaction = {
    /** Wallet transaction ID. */
    id: string;

    /** Wallet transaction type. */
    type: 'credit_free' | 'credit_paid' | 'debit';

    /** Amount of the wallet transaction. */

    amount: number;

    /** Units of credit corresponding to the transaction. */

    units: number;

    /** Generated invoice ID for the transaction. Only applies for credit_paid and debit. */
    invoice_id?: string | null;

    /** ID of the related banking transaction. */
    transaction_id?: string | null;

    /** UTC date time string in the ISO 8601 format, or milliseconds since the epoch. */
    created_at: string;
  };

  export type Settings = {
    /** Allow free credits on wallet. */
    allow_free_credits: boolean;

    /** Allow wallet top up on customer's portal. */
    allow_topup_on_portal: boolean;

    /** Unit price of each credit per currency enabled on your settings. */
    unit_credit_prices: {
      /** Currency code. See ISO 4217. */
      currency: string;

      /** Amount of 1 credit. */
      amount: number;
    }[];

    /** Last edition date of the wallet settings. */
    updated_at: string;
  };

  export type CreateInput = {
    customer_id: string;
  };

  export type UpdateInput = {
    state: 'active' | 'paused';
  };

  export type LoadInput = {
    /** Number of paying credits to load on the wallet. */
    paid_credits?: number;

    /** Number of free/offered credits to load on the wallet. */
    free_credits?: number;
  };

  export type UpdateSettingsInput = {
    /** Allow free credits on wallet. */
    allow_free_credits: boolean;

    /** Allow wallet top up on customer's portal. */
    allow_topup_on_portal: boolean;

    /** Unit price of each credit per currency enabled on your settings. */
    unit_credit_prices: {
      /** Currency code. See ISO 4217. */
      currency: string;

      /** Amount of 1 credit. */
      amount: number;
    }[];
  };
}
