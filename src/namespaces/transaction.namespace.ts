import { PaymentMethod } from './payment-method.namespace';

export namespace Transaction {
  interface Common {
    /** Transaction ID. */
    id: string;

    /** Type of the transaction. */
    type: 'subscription' | 'one_time' | 'refund';

    /** Transaction amount. */
    amount: number;

    /** Transaction currency. */
    currency: string;

    /** ID of the customer linked to the transaction. */
    customer_id: string;

    /** ID of the transaction on the payment provider (Stripe, Mollie, GoCardless, ...) side. Can be null. */
    provider_id: string | null;

    /** Date corresponding to the processing of the transaction. */
    process_at: string;

    /** Date corresponding to the refund of the transaction. Can be null. */
    refunded_at: string | null;

    /** Date corresponding to the last synchronization of the details with the payment provider. Can be null. */
    last_refreshed_at: string | null;
  }

  export interface Opt1 extends Common {
    /** Type of the payment method used in the transaction. */
    payment_method_type:
      | 'card'
      | 'transfer'
      | 'direct_debit'
      | 'direct_debit_ach'
      | 'direct_debit_bacs'
      | 'external';

    /** Payment method details. Can be null. */
    payment_method:
      | PaymentMethod.Opt1
      | PaymentMethod.Opt2
      | PaymentMethod.Opt3
      | null;

    /** Current status of the transaction. */
    status: 'to_process' | 'pending' | 'settled' | 'cancelled';
  }

  export interface Opt2 extends Common {
    /** Type of the payment method used in the transaction. */
    payment_method_type:
      | 'card'
      | 'transfer'
      | 'direct_debit'
      | 'direct_debit_ach'
      | 'direct_debit_bacs'
      | 'external';

    /** Payment method details. Can be null. */
    payment_method:
      | PaymentMethod.Opt1
      | PaymentMethod.Opt2
      | PaymentMethod.Opt3
      | null;

    /** Current status of the transaction. */
    status: 'failed';

    /**
     * authentication_required: The card was declined as the transaction requires authentication (e.g. 3-D Secure). The customer should go to their portal page and authenticate their card. If the error happened on an already authenticated transaction, the customer needs to contact their card issuer for more information.
     * payment_method_authorization_error: A transaction authorization cannot be created for a variety of reasons such as the card issuer couldn’t be reached, or the card requires a PIN.
     * payment_method_declined: The payment method was declined for a variety of reasons such as a card reported as lost or stolen, insufficient funds or reaching the limit available on the method to complete the purchase, a payment method on a known block list, etc.
     * payment_method_expired: The payment method is expired. The customer should go to their portal page and change their payment method.
     * payment_method_invalid: The payment method is invalid in most cases because of incorrect details (card/account number, CVC, expiration date, postal code).
     * payment_method_not_supported: The payment method doesn't support this type of purchase (e.g. currency, online payment).
     * declined: The payment was declined for a variety of reasons such as security violation, banking service not available, transaction not allowed, etc.
     * fraud: The payment provider suspected the transaction was fraudulent and has been blocked. Don't report more detailed information to your customer, and check on your provider account.
     * processing_error: The payment couldn't be processed by the issuer for an unknown reason.
     * provider_error: An error occurred when contacting the payment provider to initiate the transaction.
     * unknown: A generic error happened on the payment provider side.
     */
    error_type?:
      | 'authentication_required'
      | 'payment_method_authorization_error'
      | 'payment_method_declined'
      | 'payment_method_expired'
      | 'payment_method_invalid'
      | 'payment_method_not_supported'
      | 'declined'
      | 'fraud'
      | 'processing_error'
      | 'provider_error'
      | 'unknown'
      | null;

    error_message?: string | null;
  }

  export interface Opt3 extends Common {
    /** Type of the payment method used in the transaction. */
    payment_method_type: 'wallet';

    wallet_id: string;

    credits_units: number;

    /** Payment method details. Can be null. */
    payment_method:
      | PaymentMethod.Opt1
      | PaymentMethod.Opt2
      | PaymentMethod.Opt3
      | null;

    /** Current status of the transaction. */
    status: 'to_process' | 'pending' | 'settled' | 'cancelled';
  }

  export interface Opt4 extends Common {
    /** Type of the payment method used in the transaction. */
    payment_method_type: 'wallet';

    wallet_id: string;

    credits_units: number;

    /** Payment method details. Can be null. */
    payment_method: PaymentMethod.Item | null;

    /** Current status of the transaction. */
    status: 'failed';

    /**
     * authentication_required: The card was declined as the transaction requires authentication (e.g. 3-D Secure). The customer should go to their portal page and authenticate their card. If the error happened on an already authenticated transaction, the customer needs to contact their card issuer for more information.
     * payment_method_authorization_error: A transaction authorization cannot be created for a variety of reasons such as the card issuer couldn’t be reached, or the card requires a PIN.
     * payment_method_declined: The payment method was declined for a variety of reasons such as a card reported as lost or stolen, insufficient funds or reaching the limit available on the method to complete the purchase, a payment method on a known block list, etc.
     * payment_method_expired: The payment method is expired. The customer should go to their portal page and change their payment method.
     * payment_method_invalid: The payment method is invalid in most cases because of incorrect details (card/account number, CVC, expiration date, postal code).
     * payment_method_not_supported: The payment method doesn't support this type of purchase (e.g. currency, online payment).
     * declined: The payment was declined for a variety of reasons such as security violation, banking service not available, transaction not allowed, etc.
     * fraud: The payment provider suspected the transaction was fraudulent and has been blocked. Don't report more detailed information to your customer, and check on your provider account.
     * processing_error: The payment couldn't be processed by the issuer for an unknown reason.
     * provider_error: An error occurred when contacting the payment provider to initiate the transaction.
     * unknown: A generic error happened on the payment provider side.
     */
    error_type?:
      | 'authentication_required'
      | 'payment_method_authorization_error'
      | 'payment_method_declined'
      | 'payment_method_expired'
      | 'payment_method_invalid'
      | 'payment_method_not_supported'
      | 'declined'
      | 'fraud'
      | 'processing_error'
      | 'provider_error'
      | 'unknown'
      | null;

    error_message?: string | null;
  }

  export type Item = Opt1 | Opt2 | Opt3 | Opt4;

  export type CreateInput = {
    /** Monetary amount in currency's smallest unit. */
    amount: number;

    /** UTC date time string in the ISO 8601 format, or milliseconds since the epoch. */
    process_at: string;
  };
}
