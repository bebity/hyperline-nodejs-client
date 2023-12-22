export namespace Price {
  interface Common {
    /** Monetary amount of the price for the number of units defined by unit_count. Expressed in currency's smallest unit. */
    amount: number;

    /** Number of units considered for the amount. */
    unit_count: number;

    /** To limit. */
    to?: number | null;
  }

  export interface Opt1 extends Common {
    type: 'fee';

    /** Monetary amount in currency's smallest unit. */
    amount: number;
  }

  export interface Opt2 extends Common {
    type: 'volume';

    /** From limit. */
    from: number;

    /**
     * Logic used to compute the amount when usage on the tier is incomplete.

      pro_rata: The amount is computed using the pro rata of the tier's consumption.
      pay_in_full: The amount corresponds to the full payment of the tier.
      do_not_charge: The tier is not charged and ignored.
      Available options: pro_rata, pay_in_full, do_not_charge
      @default pro_rata
    */
    on_tier_incomplete: 'pro_rata' | 'pay_in_full' | 'do_not_charge';
  }

  export interface Opt3 extends Common {
    type: 'packaged';

    /** From limit. */
    from: number;

    /**
     * Logic used to compute the amount when usage reaches an incomplete bucket (the bucket size corresponds to the unitCount).

      pro_rata: The amount is computed using the pro rata of the bucket's consumption.
      pay_in_full: The amount corresponds to the full payment of the bucket.
      do_not_charge: The bucket is not charged and ignored.
      @default pro_rata
    */
    on_bucket_incomplete?: 'pro_rata' | 'pay_in_full' | 'do_not_charge' | null;
  }

  export interface Opt4 extends Common {
    type: 'bulk';

    /**
     * Logic used to compute the amount when usage on the tier is incomplete.

      pro_rata: The amount is computed using the pro rata of the tier's consumption.
      pay_in_full: The amount corresponds to the full payment of the tier.
      do_not_charge: The tier is not charged and ignored.
      @default pro_rata
    */
    on_tier_incomplete?: 'pro_rata' | 'pay_in_full' | 'do_not_charge' | null;
  }

  export interface Opt5 extends Common {
    type: 'bps';

    /** From limit. */
    from: number;

    /** Percentage applied on each unit to compute the usage. */
    percentage: number;

    /** Maximum amount for one unit. Expressed in currency's smallest unit. */
    per_unit_cap: number;

    /** Minimum amount for one unit. Expressed in currency's smallest unit. */
    per_unit_floor: number;

    /** Fee amount applied per unit. Expressed in currency's smallest unit. */
    per_unit_fee: number;
  }

  export type Item = Opt1 | Opt2 | Opt3 | Opt4 | Opt5;

  export namespace CreateInput {
    export interface Opt1 {
      type: 'fee';
      amount: number;
    }

    export interface Opt2 {
      type: 'volume';

      amount: number;

      from: number;

      to?: number | null;

      /**
       * @default pro_rata
       */
      on_bucket_incomplete?:
        | 'pro_rata'
        | 'pay_in_full'
        | 'do_not_charge'
        | null;
      unit_count: number;
    }

    // export interface Opt3 {}

    export interface Opt4 {
      type: 'bulk';

      amount: number;

      to?: number | null;

      /**
       * @default pro_rata
       */
      on_bucket_incomplete?:
        | 'pro_rata'
        | 'pay_in_full'
        | 'do_not_charge'
        | null;

      unit_count: number;
    }

    export interface Opt5 {
      type: 'bps';

      from: number;

      to?: number | null;

      percentage: number;

      per_unit_cap?: number | null;

      per_unit_floor?: number | null;

      per_unit_fee?: number | null;
    }

    export type Input = Opt1 | Opt2 | Opt4 | Opt5;
  }
}

export namespace PriceConfiguration {
  export interface Common {
    /** Price configuration ID. */
    id: string;

    /** Currency code. See ISO 4217. */
    currency: string;

    /** Two-letter country code in ISO format. See ISO 3166 Alpha 2. */
    country: string;

    /** ID of the plan on which this price configuration is eligible */
    plan_id: string;

    /** Billing interval on which the price configuration is eligible. */
    billing_interval:
      | {
          period: 'weeks' | 'month' | 'year';
          billing_interval: number;
        }
      | { period: 'once' }
      | null;

    /** Commitment interval on which the price configuration is eligible. */
    commitment_interval:
      | {
          period: 'weeks' | 'month' | 'year';
          count: number;
        }
      | { period: 'all' }
      | null;

    /** Last edition date of the price configuration. */
    updated_at: string;
  }

  // interface CommonPrice {
  //   /** Monetary amount of the price for the number of units defined by unit_count. Expressed in currency's smallest unit. */
  //   amount: number;

  //   /** Number of units considered for the amount. */
  //   unit_count: number;

  //   /** To limit. */
  //   to?: number | null;
  // }

  export interface Opt1 extends Common {
    type: 'fee';

    prices: Array<Price.Opt1>;
  }

  export interface Opt2 extends Common {
    type: 'volume';

    prices: Array<Price.Opt2>;
  }

  export interface Opt3 extends Common {
    type: 'packaged';

    prices: Array<Price.Opt3>;
  }

  export interface Opt4 extends Common {
    type: 'bulk';

    prices: Array<Price.Opt4>;
  }

  export interface Opt5 extends Common {
    type: 'bps';

    prices: Array<Price.Opt5>;
  }

  export type Item = Opt1 | Opt2 | Opt3 | Opt4 | Opt5;

  export type UpdatePricesInput = {
    type: 'fee';

    amount: number;

    /**
     * @default 'once'
     */
    interval?: 'once' | 'weeks' | 'month' | 'year';
  }[];
}
