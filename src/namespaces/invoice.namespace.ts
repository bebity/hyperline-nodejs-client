import {
  Address,
  CommonSearchInput,
  FieldToDateFilters,
  FieldToEnumFilters,
  FieldToStringFilters,
} from 'src/types/api-common.type';
import { Transaction } from './transaction.namespace';

export namespace Invoice {
  export type LineItem = {
    /** Invoice line item ID. */
    id: string;

    /** Name of the line item, corresponding to the related product. */
    name: string;

    /** Product ID related to the invoice line item. Can be null. */
    product_id: string | null;

    /** Product type related to the invoice line item. */
    product_type: 'flat_fee' | 'seat' | 'dynamic' | null;

    /** Count of units of the product related to the invoice line item. */
    units_count: number;

    /** Amount of one unit of the product related to the invoice line item. Expressed in the currency's smallest unit. */
    unit_amount: number;

    /** Total amount of the invoice line item. Expressed in the currency's smallest unit. */
    amount: number;

    /** Total amount without the taxes amount of the invoice line item. Expressed in the currency's smallest unit. */
    amount_excluding_tax: number;

    /** Tax rate of the invoice line item. */
    tax_rate: number;

    /** Tax amount of the invoice line item. Expressed in the currency's smallest unit. */
    tax_amount: number;

    /** Amount corresponding to the discounted part of the total amount of the invoice line item. Expressed in the currency's smallest unit. */
    discount_amount: number;

    /** Percentage applied to compute the discounted part of the invoice line amount. Only if coupons applied are percentage based. Can be null. */
    discount_percent?: number | null;
  };

  export enum StatusEnum {
    draft = 'draft',
    open = 'open',
    to_pay = 'to_pay',
    grace_period = 'grace_period',
    partially_paid = 'partially_paid',
    paid = 'paid',
    late = 'late',
    voided = 'voided',
    closed = 'closed',
    error = 'error',
    missing_info = 'missing_info',
  }

  export enum TypeEnum {
    invoice = 'invoice',
    credit_note = 'credit_note',
  }

  export type Item = {
    /** Invoice ID. */
    id: string;

    /** Invoice number is generated by Hyperline and follows the format defined in your settings. */
    number: string;

    /** Available options: `invoice`, `credit_note` */
    type: TypeEnum | keyof typeof TypeEnum;

    /**
     * Indicates the current state of the invoice.
     * Available options: `draft`, `open`, `to_pay`, `grace_period`, `partially_paid`, `paid`, `late`, `voided`, `closed`, `error`, `missing_info`
     */
    status: StatusEnum | keyof typeof StatusEnum;

    /** Unique identifier generated by Hyperline to ease reconciliation with payment. Useful for bank transfer. */
    reference?: string | null;

    /** Reference to the purchase order linked to the invoice. */
    purchase_order?: string | null;

    /** ID of the original invoice this credit note is linked to (only used for credit note). */
    original_invoice_id?: string | null;

    /** Number of the original invoice this credit note is linked to (only used for credit note). */
    original_invoice_number?: string | null;

    /** Currency code. See ISO 4217. */
    currency: string;

    /** Sum of the amount and taxes amount of all products on the invoice. Expressed in the currency's smallest unit. */
    total_amount: number;

    /** Amount still need to be paid for the invoice. Expressed in the currency's smallest unit. */
    amount_due: number;

    /** Amount already paid for the invoice. Expressed in the currency's smallest unit. */
    amount_paid: number;

    /** Amount corresponding to the recurring non-variable part of the total amount. Expressed in the currency's smallest unit. */
    amount_fixed: number;

    /** Total amount without the taxes amount. Expressed in the currency's smallest unit. */
    amount_excluding_tax: number;

    /** Tax amount of the invoice. Expressed in the currency's smallest unit. */
    tax_rate: number;

    /** Tax amount of the invoice. Expressed in the currency's smallest unit. */
    tax_amount: number;

    /**
     * Tax scheme of the invoice.
     * Available options: `standard`, `exempt`, `reverse_charge`, `manual`, `not_eligible`
     */
    tax_scheme:
      | 'exempt'
      | 'standard'
      | 'reverse_charge'
      | 'manual'
      | 'not_eligible';

    /** Amount corresponding to the discounted part of the total amount. Expressed in the currency's smallest unit. */
    discount_amount: number;

    /** Conversion rate used between the invoice currency and your accounting currency. */
    conversion_rate?: number | null;

    /** Amount converted using the conversion rate. Expressed in the currency's smallest unit. */
    converted_amount: number;

    /** Date of the conversion of the amount. */
    converted_at: string | null;

    /** ID of the payment method used to pay the invoice. */
    payment_method_id?: string | null;

    /** Number of attempts to pay the invoice. */
    attempt_count: number;

    /** Customer information */
    customer: {
      /** Customer ID. */
      id: string;

      /** Customer legal name. */
      name: string;

      /** Email to which all communications will be sent. */
      email?: string | null;

      /** ID of the customer in your system. This helps matching your customer with the one on Hyperline. */
      external_id?: string | null;

      /** Key/value pairs to store any information you find useful. */
      vat_number?: string | null;

      /** Company billing address */
      address: Address;
    };

    /** ID of the subscription related to the invoice. */
    subscription_id: string | null;

    /** Beginning of the billing period of the invoice. */
    period_starts_at: string | null;

    /** End of the billing period of the invoice. */
    period_ends_at: string | null;

    /** Emission date of the invoice. */
    emitted_at: string;

    /** Due date of the invoice. Computed from the emission date and the payment delay configured in your settings. */
    due_at: string;

    /** Date corresponding to the refund of the invoice, previously paid. A credit note exists with an original invoice ID equals to this invoice ID. */
    refunded_at: string | null;

    /** Date the invoice grace period ended. This happens at the emission date + the grace period duration configured in your settings. */
    grace_period_ended_at: string | null;

    /** Date the invoice was fully paid. */
    settled_at: string | null;

    /** Transactions related to the invoice */
    transactions: Array<Transaction.Item>;

    /** Line items of the invoice */
    line_items: Array<LineItem>;
    // Line item fields...

    /** Coupons applied to the invoice */
    coupons: Array<{
      /** Coupon ID. */
      id: string;

      /** Coupon name. */
      name: string;

      /** Amount to apply as a discount on the total amount (excluding taxes) of a subscription. Expressed in the currency's smallest unit. */
      discount_amount: number;

      /** Percentage to apply as a discount on the amount (excluding taxes) of a product. */
      discount_percent?: number | null;

      /** IDs of the line items to which the coupon applies. */
      line_items_ids: string[];
    }>;
  };

  export type CreateLineItemInput = {
    /**Product ID related to the invoice line item. Only products of type flat_fee can be used. */
    product_id: string;

    /** Name of the line item as it will appear on the invoice. Default to the product name. */
    name?: string;

    /** Description of the line item as it will appear on the invoice. Default to the product description. */
    description?: string | null;

    /**
     * Count of units of the product related to the invoice line item
     * @default 1
     */
    units_count: number;

    /** Amount of one unit of the product related to the invoice line item. Expressed in the currency's smallest unit. */
    unit_amount?: number;

    /** Start date of the period corresponding to the line item charge. */
    period_start?: string;

    /** End date of the period corresponding to the line item charge. */
    period_end?: string;
  };

  export type CreateOneOffInput = {
    customer_id: string;

    /** Currency code. See ISO 4217. */
    currency?: string;

    /** Indicates the current state of the invoice. */
    status?: 'to_pay' | 'paid';

    /** Unique identifier generated by Hyperline to ease reconciliation with payment. Useful for bank transfer. */
    reference?: string;

    /** Reference to the purchase order linked to the invoice. */
    purchase_order?: string;

    /** Tax rate of the invoice */
    tax_rate?: number;

    /**
     * Payment method strategy used to charge the invoice. Only applies to to_pay status.
      current: Use the current default payment method of the customer.
      external: Manage the payment of the invoice outside of Hyperline.
     */
    payment_method_strategy?: 'current' | 'external';

    /** Emission date of the invoice. */
    emitted_at?: string;

    /** Due date of the invoice. Computed from the emission date and the payment delay configured in your settings. */
    due_at?: string;

    /** Date the invoice was fully paid. */
    settled_at?: string;

    line_items: Array<CreateLineItemInput>;
  };

  export type SearchInput = CommonSearchInput &
    FieldToStringFilters<'id'> &
    FieldToStringFilters<'customerId'> &
    FieldToStringFilters<'customerName'> &
    FieldToStringFilters<'invoiceNumber'> &
    FieldToDateFilters<'dueDate'> &
    FieldToDateFilters<'emissionDate'> &
    FieldToDateFilters<'periodStart'> &
    FieldToDateFilters<'periodEnd'> &
    FieldToDateFilters<'settledAt'> &
    FieldToStringFilters<'subscriptionId'> &
    FieldToEnumFilters<'status', StatusEnum | keyof typeof StatusEnum> &
    FieldToEnumFilters<'type', TypeEnum | keyof typeof TypeEnum>;
}