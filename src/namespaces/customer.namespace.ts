import {
  Address,
  ApiItem,
  CommonSearchInput,
  FieldToDateFilters,
  FieldToEnumFilters,
  FieldToStringFilters,
  PaymentMethodsEnum,
  ProvidersEnum,
} from 'src/types/api-common.type';
import { Subscription } from './subscription.namespace';
import { PaymentMethod } from './payment-method.namespace';

export namespace Customer {
  export enum StatusEnum {
    active = 'active',
    archived = 'archived',
    imported = 'imported',
    all = 'all',
    inactive = 'inactive',
  }

  export interface Item extends ApiItem {
    /** Customer legal name. */
    name: string;

    /** Customer status. */
    status: StatusEnum | keyof typeof StatusEnum;

    /** Currency code. See ISO 4217. */
    currency: string;

    /** Two-letter country code in ISO format. See ISO 3166 Alpha 2. */
    country?: string | null;

    /** Customer tax number. */
    vat_number?: string | null;

    /** Indicates customer's tax number validity. */
    vat_number_valid?: string | null;

    /** ID of the customer in your system. This helps matching your customer with the one on Hyperline. */
    external_id?: string | null;

    /** Key/value pairs to store any information you find useful. */
    properties?:
      | string
      | number
      | boolean
      | object
      | (string | number | boolean)[];

    /** Email to which all communications will be sent. */
    billing_email?: string | null;

    /** Company billing address */
    billing_address?: Address;

    /**
     * List of payment methods you allow your customer to pay with. You customer will be able to select one of them in their portal page and those will be the default options when creating a checkout session.
     */
    available_payment_methods?: PaymentMethodsEnum[];

    /** Default type of payment method used to pay subscriptions and one-time payments. */
    current_payment_method_type?: PaymentMethodsEnum | null;

    /** ID of the default payment method of the customer. Only applies to card and direct debit. */
    current_payment_method_id?: string | null;

    /**
     * @deprecated please use providers
     */
    transaction_provider_id?: string | null;

    subscriptions: {
      id: string;
      status: Subscription.StatusEnum;
    };

    /**
     * @deprecated please use subscriptions
     */
    current_subscription_id?: string | null;

    /** Provider/ID mapping of the customer in the related providers. Provider (key) can be gocardless, mollie, stripe, hubspot, salesforce. */
    providers: Record<ProvidersEnum | string, string>;

    /** Default payment method of the customer. Only applies to card and direct debit. */
    current_payment_method?: PaymentMethod.Item | null;

    /**
      @deprecated please use subscriptions
    */
    current_subscription?: {
      id: string;
      current_period_ends_at?: string | null;
      current_period_started_at?: string | null;
      starts_at?: string | null;
      billing_plan_id?: string | null;
      interval?: Subscription.IntervalsEnum | null;
      invoice_schedule?: Subscription.InvoiceSchedulesEnum | null;
      status: Subscription.StatusEnum;
    } | null;
  }

  export type CreateInput = {
    /** Customer legal name. */
    name?: string;

    /** Currency code. See ISO 4217. */
    currency?: string;

    /** Two-letter country code in ISO format. See ISO 3166 Alpha 2. */
    country?: string;

    /** Customer tax number. */
    vat_number?: string | null;

    /** ID of the customer in your system. This helps matching your customer with the one on Hyperline. */
    external_id?: string | null;

    /** Key/value pairs to store any information you find useful. */
    properties?:
      | string
      | number
      | boolean
      | object
      | (string | number | boolean)[];

    /** Email to which all communications will be sent. */
    billing_email?: string | null;

    /** Company billing address */
    billing_address?: Address;

    /**
     * List of payment methods you allow your customer to pay with. You customer will be able to select one of them in their portal page and those will be the default options when creating a checkout session.
     */
    available_payment_methods?: (
      | PaymentMethodsEnum
      | keyof typeof PaymentMethodsEnum
    )[];

    /** Default type of payment method used to pay subscriptions and one-time payments. */
    payment_method_type?: PaymentMethodsEnum | keyof typeof PaymentMethodsEnum;
  };

  export type UpdateInput = Partial<CreateInput>;

  export type SearchInput = CommonSearchInput &
    FieldToStringFilters<'id'> &
    FieldToDateFilters<'created_at'> &
    FieldToDateFilters<'deleted_at'> &
    FieldToDateFilters<'created_at'> &
    FieldToStringFilters<'name'> &
    FieldToStringFilters<'type'> &
    FieldToEnumFilters<'status', Customer.StatusEnum> &
    FieldToStringFilters<'currency'> &
    FieldToStringFilters<'country'> &
    FieldToStringFilters<'vat_number'> &
    FieldToStringFilters<'external_id'> &
    FieldToStringFilters<'billing_email'> & { search?: string | null };
}
