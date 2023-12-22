import {
  ApiItem,
  CommonSearchInput,
  FieldToStringFilters,
} from 'src/types/api-common.type';

export namespace ThirdPartyApp {
  export type Item = {
    id: string;

    name: string;

    description?: string | null;

    logo_uri?: string | null;

    callbacks: string[];

    client_id: string;

    client_secret?: string;
  };

  export type CreateInput = {
    name: string;

    description?: string | null;

    logo_uri?: string | null;

    callbacks: string[];
  };

  export type UpdateInput = CreateInput;
}
