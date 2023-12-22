import { ApiItem, CommonSearchInput } from 'src/types/api-common.type';
import { Product } from './product.namespace';
import { Coupon } from './coupon.namespace';
import { PaymentMethod } from './payment-method.namespace';
import { Price } from './price-configuration.namespace';

export namespace SubscriptionV2 {
  export type LiveBilling = {
    /** Total amount of the invoice. Expressed in the currency's smallest unit. */
    total_amount: number;

    /** Total discount amount of the invoice. Expressed in the currency's smallest unit. */
    total_discount: number;

    /** Total amount of the invoice. Expressed in the currency's smallest unit. */
    fixed_amount: number;

    /** Billing items of the invoice. */
    billing_items: Array<{
      /** ID of the billing item. */
      id: string | null;

      /** Total amount of the billing item. Expressed in the currency's smallest unit. */
      total_amount: number;

      /** Original amount of the billing item. Expressed in the currency's smallest unit. */
      original_amount: number;

      /** Discount amount of the billing item. Expressed in the currency's smallest unit. */
      discount_amount: number | null;

      /** Name of the billing item. */
      item_name: string;

      /** Tiers of the billing item. */
      tiers: Array<{
        /** Tier ID. */
        id: string;

        /** Tier name. */
        name: string;

        /** Tier amount. Expressed in the currency's smallest unit. */
        amount: number;

        /** Tier quantity. */
        quantity: number;
      }>;
    }>;

    /** Coupons applied to the invoice. */
    coupons: Array<{
      /** Coupon ID. */
      id: string;

      /** Coupon name. */
      name: string;

      /** Amount to apply as a discount on the total amount (excluding taxes) of a subscription. Expressed in the currency's smallest unit. */
      discount_amount: number;

      /** IDs of the line items to which the coupon applies. */
      item_ids: string[];
    }>;
  };

  export enum StatusEnum {
    draft = 'draft',
    pending = 'pending',
    active = 'active',
    paused = 'paused',
    cancelled = 'cancelled',
    voided = 'voided',
    errored = 'errored',
  }

  export enum CancellationStrategiesEnum {
    /** Will charge the customer the unpaid amount for the prorated period up to the end of the current period. */
    charge_prorata = 'charge_prorata',

    /** Will charge the customer a custom amount. */
    charge_custom = 'charge_custom',

    /** Will refund to the customer the overpaid subscription amount using prorated calculations on the cancellation date. */
    refund_prorata = 'refund_prorata',

    /** Will refund to the customer a custom amount. */
    refund_custom = 'refund_custom',

    /** Will cancel the subscription at the end date of the current billing period. */
    end_of_period = 'end_of_period',

    /** Will only cease the subscription without any additional actions. */
    do_nothing = 'do_nothing',
  }

  export enum ActivationStrategiesEnum {
    /** The subscription will become active on the specified start date. If the start date is in the past, it will be activated immediately. */
    start_date = 'start_date',

    /** The subscription requires activation through a manual action. */
    manually = 'manually',

    /** The subscription will be activated once the checkout is completed, but only if the start date is in the past. Otherwise, activation will occur later on the specified start date. */
    checkout = 'checkout',
  }

  export interface Item extends ApiItem {
    /** Currency code. See ISO 4217. */
    currency: string;

    /** Indicates the current state of the subscription. */
    status: StatusEnum;

    /** Reference to the purchase order. */
    purchase_order?: string | null;

    /** Key/value pairs to store any information you find useful. */
    properties?: Record<
      string,
      string | number | boolean | object | (string | number | boolean)[]
    >;

    /** ID of the customer. */
    customer_id: string;

    /** ID of the plan used to create the subscription. */
    plan_id?: string | null;

    /** ID of the checkout session. */
    checkout_session_id?: string | null;

    /** Interval used to represent the commitment period of the subscription. Note that the commitment interval is different than the subscription duration (e.g. you can have a mandatory commitment of 1 year but an unlimited subscription). */
    commitment_interval: {
      period: 'days' | 'weeks' | 'months' | 'years';
      count: number;
    } | null;

    /** Indicates if the subscription should automatically renew. */
    renew_automatically: boolean;

    /** Strategy used to activate the subscription. */
    activation_strategy?:
      | ActivationStrategiesEnum
      | keyof typeof ActivationStrategiesEnum
      | null;

    /** Subscription start date. */
    starts_at: string;

    /** Date when the subscription was paused. Only applies to paused status. */
    paused_at?: string | null;

    /** Date when the subscription was reactivated after the last pause event. */
    reactivate_at?: string | null;

    /** Subscription cancel date. */
    cancel_at?: string | null;

    /** Strategy used to cancel the subscription. If not specified do_nothing is used. */
    cancellation_strategy?: CancellationStrategiesEnum | null;

    /** Custom amount used when cancelling the subscription. Only applies to the charge_custom or the refund_custom cancellation strategy. */
    cancellation_amount: number;

    /** Estimated Annual Recurring Revenue generated by the subscription. */
    estimated_arr: number;

    /** Start date of the current billing period. */
    current_period_started_at?: string | null;

    /** End date of the current billing period. */
    current_period_ends_at?: string | null;

    /** Date on which the next subscription payment will occur. */
    next_payment_at?: string | null;

    /** Next subscription commitment renewal date. */
    renews_at?: string | null;

    /** End date of the trial period. */
    trial_ends_at?: string | null;

    /** Products that make up the subscription. */
    products: Product.Item[];

    /** Coupons to be applied to the prices of subscription products. */
    coupons: Coupon.Item[];

    plan?: {
      /** ID of the plan used to create the subscription. */
      id: string;

      /** Name of the plan used to create the subscription. */
      name: string;
    } | null;

    /** Checkout session of the subscription. */
    checkout_session?: {
      /** Checkout session ID. */
      id: string;

      /** Checkout session current status. */
      status: 'opened' | 'completed' | 'cancelled' | 'errored';

      /** Types of payment method available on the checkout session. */
      available_payment_methods: (
        | 'card'
        | 'direct_debit'
        | 'direct_debit_ach'
        | 'direct_debit_bacs'
        | 'transfer'
      )[];

      /** URL to which we automatically redirect the user after the completion of the checkout. */
      redirect_url?: string | null;

      /** Email address to which we'll automatically send a message with the checkout link. */
      send_to?: {
        /** Email address to which we'll automatically send a message with the checkout link. */
        email: string;

        /** Custom message to include in the email send. If not provided, we will use a generic one. */
        message?: string | null;
      } | null;

      /** URL to access the checkout session. Only defined if the status is opened. */
      url?: string | null;
    } | null;

    /** Payment method type used to pay the subscription. */
    payment_method_type?:
      | 'card'
      | 'direct_debit'
      | 'direct_debit_ach'
      | 'direct_debit_bacs'
      | 'transfer'
      | 'external'
      | null;

    /** Payment method details used to pay the subscription. */
    payment_method?: PaymentMethod.Item;

    live_billing?: LiveBilling;
  }

  export type CreateInput = {
    /** ID of the customer. */
    customer_id: string;

    /** Reference to the purchase order. */
    purchase_order?: string | null;

    /** Interval used to represent the commitment period of the subscription. Note that the commitment interval is different than the subscription duration (e.g. you can have a mandatory commitment of 1 year but an unlimited subscription). */
    commitment_interval?: {
      period: 'days' | 'weeks' | 'months' | 'years';
      count: number;
    } | null;

    /** Indicates if the subscription should automatically renew. */
    renew_automatically?: boolean | null;

    /** Subscription start date. */
    starts_at: string;

    /** End date of the trial period. */
    trial_ends_at?: string | null;

    /** Delay first invoice to the end of the trial period. */
    trial_delay_first_invoice?: boolean | null;

    /** Strategy used to activate the subscription. */
    activation_strategy?:
      | ActivationStrategiesEnum
      | keyof typeof ActivationStrategiesEnum
      | null;

    /** Payment method strategy used to bill the subscription. */
    payment_method_strategy: 'current' | 'external' | 'new';

    /** Set the allowed types of payment methods for the customer. Only applies to the new payment method strategy. */
    available_payment_method_types?:
      | (
          | 'card'
          | 'direct_debit'
          | 'direct_debit_ach'
          | 'direct_debit_bacs'
          | 'transfer'
        )[]
      | null;

    /** Subscription cancel date. */
    cancel_at?: string | null;

    /** Strategy used to cancel the subscription. If not specified do_nothing is used. */
    cancellation_strategy?:
      | CancellationStrategiesEnum
      | keyof typeof CancellationStrategiesEnum
      | null;

    /** Custom amount used when cancelling the subscription. Only applies to the charge_custom or the refund_custom cancellation strategy. */
    cancellation_amount?: number | null;

    /** Checkout session of the subscription. */
    checkout_session?: {
      /** Email address to which we'll automatically send a message with the checkout link. */
      send_to?: {
        /** Email address to which we'll automatically send a message with the checkout link. */
        email: string;

        /** Custom message to include in the email send. If not provided, we will use a generic one. */
        message?: string | null;
      } | null;

      /** URL to which we automatically redirect the user after the completion of the checkout. */
      redirect_url?: string | null;
    } | null;

    /** ID of the plan used to create the subscription. */
    plan_id?: string;

    // interval: 'monthly' | 'yearly' | 'quarterly';
    // billing_plan_id: string;

    /** Coupons to be applied to the prices of subscription products. */
    coupons?: {
      /** Coupon ID. */
      id: string;

      /** Coupon frequency. */
      repeat: 'once' | 'forever' | 'custom';

      /** Coupon expiration date. Only applies to the custom coupon frequency. */
      expires_at?: string | null;

      /** Coupon first application date. */
      apply_at?: string | null;

      /** Product IDs to which the coupon will be applied. */
      product_ids?: string[] | null;
    }[];

    /** Products that make up the subscription. */
    products?: {
      /** Product ID. */
      id: string;

      /** Product name. This will appear on the final invoices. */
      name?: string | null;

      /** Product description. This will appear on the final invoices. */
      description?: string | null;

      /** Indicates if the dates of the interval should be automatically added in the product description on the invoices. */
      description_display_interval_dates?: boolean | null;

      /** Interval on which the product is billed. This interval can be different between products and can differ from the subscription commitment interval. */
      payment_interval?:
        | {
            period: 'once';
          }
        | {
            period: 'days' | 'weeks' | 'months' | 'years';
            count: number;
          }
        | null;

      /** Indicates if the product should be billed at the start or the end of the payment interval. */
      payment_schedule?: 'start' | 'end' | null;

      /** Price of the product. Only applies to products of type flat_fee. If not specified or for other product types, the matching price (depending on the currency, interval, etc) of the product defined in the products catalog/plan is used. */
      price?: {
        /** Price type. */
        type: 'fee';

        /** Monetary amount in currency's smallest unit. */
        amount: number;
      } | null;

      /** Number of product units. Only applies to products of type seat. */
      count?: number | null;

      /** Product name. This will appear on the final invoices. Only applies to products of type seat or usage. */
      unit_name?: string | null;

      /** Minimum of units committed. If usage is less than this number, then this value will be used. Only applies to products of type usage. */
      min_committed_count?: number | null;

      /** Minimum amount billed. If the final computed amount from the usage for this product is less than this amount, then this value will be used. Only applies to products of type usage. */
      min_amount?: number | null;

      /** Maximum amount billed. If the final computed amount from the usage for this product is greater than this amount, then this value will be used. Only applies to products of type usage. */
      max_amount?: number | null;

      /** Indicates on which type of interval the usage should be aggregated. */
      metering_interval_type?:
        | 'subscription_commitment'
        | 'subscription_duration'
        | 'payment_interval'
        | 'full_database'
        | 'custom'
        | null;

      /** Interval on which the usage is aggregated. Only applies to custom metering interval type. Only applies to products of type usage. */
      metering_interval?: {
        period: 'days' | 'weeks' | 'months' | 'years';
        count: number;
      };

      /** Starting date to consider when aggregating usage. Only applies to custom metering interval type. Only applies to products of type usage. */
      metering_interval_start_at?: string | null;

      /** Only bill the usage difference comparing to the previous period (i.e. actual amount minus last invoice amount). Doesn't apply to payment_interval metering interval type. Only applies to products of type usage. */
      bill_usage_difference?: boolean | null;
    }[];

    /** Key/value pairs to store any information you find useful. */
    properties?: Record<
      string,
      string | number | boolean | object | (string | number | boolean)[]
    >;
  };

  export type SearchInput = CommonSearchInput;

  export namespace CreateUpdateInput {
    export interface Common<Payload> {
      application_schedule: 'immediately';

      payment_schedule: 'immediately';

      calculation_method: 'pro_rata' | 'pay_in_full' | 'do_not_charge';

      payload: Payload;
    }

    export namespace Opt1 {
      export namespace Payload {
        export interface Commmon {
          product_id: string;

          billing_interval_period:
            | 'once'
            | 'all'
            | 'days'
            | 'weeks'
            | 'quarters'
            | 'months'
            | 'years';

          billing_interval_count: number;

          product_name: string;

          product_description: string;

          start_or_end: 'start' | 'end';

          display_interval_dates_in_description?: boolean;
        }

        export interface Opt1 extends Commmon {
          prices: Array<Price.CreateInput.Opt1>;

          count?: number | null;

          type: 'fee';
        }

        export interface Opt2 extends Commmon {
          prices: Array<Price.CreateInput.Opt2 | Price.CreateInput.Opt4>;

          count: number;

          type: 'seat';
        }

        export interface Opt3 extends Commmon {
          prices: Array<Price.CreateInput.Opt2 | Price.CreateInput.Opt4>;

          type: 'dynamic';

          count?: number | null;

          min_amount?: number | null;

          max_amount?: number | null;

          committed_count?: number | null;

          usage_interval_type?:
            | 'subscription_commitment'
            | 'subscription_duration'
            | 'item_payment_interval'
            | 'full_database'
            | 'custom'
            | null;

          usage_interval_count?: number | null;

          usage_interval_period?:
            | 'days'
            | 'weeks'
            | 'months'
            | 'years'
            | 'quarter'
            | 'all'
            | 'once'
            | null;

          usage_interval_period_start?: string | null;

          only_bill_usage_difference?: boolean | null;

          last_usage_billed: any;
        }

        export type Item = Opt1 | Opt2 | Opt3;
      }

      export interface Item extends Common<Payload.Item> {
        type: 'add_item';
      }
    }

    export namespace Opt2 {
      export interface Item
        extends Common<{
          coupon_id: string;

          repeat: 'once' | 'forever' | 'custom';

          expires_at?: string;

          apply_at?: string;

          billing_item_ids?: string[];
        }> {
        type: 'add_coupon';
      }
    }

    export namespace Opt3 {
      export interface Item
        extends Common<{
          coupon_id: string;
        }> {
        type: 'remove_coupon';
      }
    }

    export namespace Opt4 {
      export interface Item
        extends Common<{
          product_id: string;
        }> {
        type: 'remove_item';
      }
    }

    export namespace Opt5 {
      export interface Item
        extends Common<{
          product_id: string;

          count: number;
        }> {
        type: 'update_count';
      }
    }

    export type Input =
      | Opt1.Item
      | Opt2.Item
      | Opt3.Item
      | Opt4.Item
      | Opt5.Item;
  }

  export type CancelInput = {
    cancel_at?: string;

    pro_rata?: boolean;
  };

  export type RefreashSeatProductsResponse = {
    /** Subscription update ID. */
    id: string;

    /** Indicates when the subscription should be updated. */
    application_schedule: 'immediately' | 'next_period' | 'custom';

    /** Date when the subscription should be updated. */
    apply_at: string;

    /** Indicates when the subscription should be billed. */
    payment_schedule: 'immediately' | 'next_invoice' | 'custom';

    /** Indicates how the products price should be calculated. */
    calculation_method: 'pro_rata' | 'pay_in_full' | 'do_not_charge';

    /** Amount to adjust the subscription price. */
    adjustment_amount?: number | null;

    /** Subscription ID. */
    subscription_id: string;

    /** Product ID. */
    product_id: string;

    /** Previous count. */
    previous_count: number;

    /** New count. */
    new_count: number;

    /** The next refresh date. Exists if your seat item is configured to be refreshed periodically. */
    next_refresh_date?: string | null;
  };
}
