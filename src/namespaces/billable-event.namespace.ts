export namespace BillableEvent {
  export type CreateInput = {
    /* Hyperline ID or external ID of the existing customer. */
    customer_id: string;

    /* Type corresponding to the event. When creating a dynamic product, this type will be used to map the related events to specific prices. */
    event_type: string;

    /* Timestamp of the event in ISO 8601 format */
    timestamp: string;

    /* Payload of the event containing an ID and any additional metadata. */
    record: {
      /* Unique ID for the event */
      id: string;

      /* Any additional metadata */
      [key: string]: any;
    };
  };
}
