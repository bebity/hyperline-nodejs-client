export namespace Subscription {
  export enum StatusEnum {
    draft = 'draft',
    pending = 'pending',
    trialing = 'trialing',
    active = 'active',
    paused = 'paused',
    errored = 'errored',
    cancelled = 'cancelled',
    voided = 'voided',
  }

  export enum IntervalsEnum {
    weekly = 'weekly',
    monthly = 'monthly',
    quarterly = 'quarterly',
    yearly = 'yearly',
    once = 'once',
  }

  export enum InvoiceSchedulesEnum {
    period_start = 'period_start',
    period_end = 'period_end',
  }
}
