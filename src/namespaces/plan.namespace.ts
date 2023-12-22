import {
  ApiItem,
  CommonSearchInput,
  FieldToStringFilters,
} from 'src/types/api-common.type';
import { Product } from './product.namespace';

// id
// string
// required
// Plan ID.

// name
// string
// required
// Plan name.

// description
// string | null
// required
// Plan description.

// commitment_interval
// object | null
// required
// Interval used to represent the commitment period of the plan.

// Show child attributes

// renew_automatically
// boolean
// required
// Indicates if the subscription to the plan should automatically renew.

// trial_interval
// object | null
// required
// Interval used to represent the trial period of the plan.

// Hide child attributes

// trial_interval.period
// enum<string>
// required
// Available options: days, weeks, months, years
// trial_interval.count
// number
// required

export namespace Plan {
  export type Item = {
    /** Plan ID. */
    id: string;

    /** Plan name. */
    name: string;

    /** Plan description. */
    description?: string | null;

    /** Interval used to represent the commitment period of the plan. */
    commitment_interval?:
      | {
          period: 'weeks' | 'month' | 'year';
          count: number;
        }
      | { period: 'all' }
      | null;

    /** Indicates if the subscription to the plan should automatically renew. */
    renew_automatically: boolean;

    /** Interval used to represent the trial period of the plan. */
    trial_interval?: {
      period: 'days' | 'weeks' | 'months' | 'years';
      count: number;
    } | null;

    products: Array<Product.Item>;
  };

  export type SearchInput = CommonSearchInput;
}
