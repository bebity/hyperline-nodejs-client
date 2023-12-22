export namespace Integration {
  export type Item = {
    token: string;
    token_type: 'bearer';
  };

  export type CreateComponentInput = {
    customer_id: string;
  };
}
