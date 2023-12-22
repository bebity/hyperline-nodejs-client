import { Injectable, Logger } from '@nestjs/common';
import { AbstractBasicRepository } from './abstracts/basic-repository.abstract';
import { Analytics } from 'src/namespaces/analytics.namespace';
import { BillableEvent } from 'src/namespaces/billable-event.namespace';

@Injectable()
export class BillableEventsRepository extends AbstractBasicRepository {
  public base_url = '/v1/events';

  public api_type = 'events_ingestion_api' as const;

  public repository_name: string = BillableEventsRepository.name;

  create(input: BillableEvent.CreateInput) {
    return this.response(
      this.request<void>({
        url: this.url,
        method: 'GET',
        data: input,
      }),
    );
  }

  create_many(input: BillableEvent.CreateInput[]) {
    return this.response(
      this.request<void>({
        url: `${this.url}/batch`,
        method: 'GET',
        data: input,
      }),
    );
  }
}
