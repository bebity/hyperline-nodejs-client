export namespace Webhook {
  export type Message = {
    /** Webhook message ID. */
    id: string;

    /** Unique ID corresponding to the event occurrence in the Hyperline system. */
    event_id: string;

    /** Webhook message payload. */
    payload: {
      /** Event type. */
      event_type:
        | 'customer.created'
        | 'customer.updated'
        | 'customer.archived'
        | 'customer.recovered'
        | 'customer.deleted'
        | 'subscription.created'
        | 'subscription.activated'
        | 'subscription.paused'
        | 'subscription.cancelled'
        | 'subscription.voided'
        | 'subscription.errored'
        | 'subscription.charged'
        | 'invoice.grace_period.started'
        | 'invoice.ready'
        | 'invoice.settled'
        | 'credit_note.ready'
        | 'credit_note.settled'
        | 'checkout.created'
        | 'checkout.completed'
        | 'payment_method.created'
        | 'payment_method.activated'
        | 'payment_method.errored'
        | 'payment_method.deleted'
        | 'wallet.credited'
        | 'wallet.debited'
        | 'daily_analytics.ready'
        | 'dataloader.failed';

      /** Depends on the type of event, see the event catalog for more details. */
      data: object;
    };

    /** Date time string in the ISO 8601 format. */
    sent_at: string;
  };

  export type Paginated = {
    meta: {
      iterator?: string | null;
    };
    data: Message[];
  };

  export type SearchMessagesInput = {
    /** Date time string in the ISO 8601 format. */
    before?: string | null;

    /** Date time string in the ISO 8601 format. */
    after?: string | null;

    /** Event types to consider. */
    event_types?: string[] | null;

    /** Number of items to return. */
    limit?: number | null;

    /** Iterator token. */
    iterator?: string | null;
  };
}
