/**
 * @deprecated BillingPlan namespace is deprecated
 */
export namespace BillingPlan {
  /**
   * @deprecated BillingPlan namespace is deprecated
   */
  export type Item = {
    id: string;
    name: string;
    description: string;
    billing_scenario_id: string;
    available_intervals: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
    billing_items: {
      id: string;
      name: string;
      type: 'flat_fee' | 'dynamic' | 'addon' | 'one_off' | 'seat';
      prices: {
        id: string;
        from?: number | null;
        to?: number | null;
        /** Monetary amount in currency's smallest unit. */
        amount: number;
        unit_count?: number | null;
        billing_item_id: string;
        /** Currency code. See ISO 4217. */
        currency: string;
      };
    };
  };
}
