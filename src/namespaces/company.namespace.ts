import { Address } from 'src/types/api-common.type';

export namespace Company {
  export type Item = {
    /** Unique ID for the company. */
    id: string;

    /** Company name. */
    name: string;

    /** Company logo URL. */
    logo_url: string;

    /** Company billing address */
    address: Address;
  };
}
