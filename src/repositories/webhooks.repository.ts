import { Injectable } from '@nestjs/common';
import { AbstractBasicRepository } from './abstracts/basic-repository.abstract';
import { Webhook } from 'src/namespaces/webhook.namespace';

@Injectable()
export class WebhooksRepository extends AbstractBasicRepository {
  public base_url = '/v1/webhooks';

  public api_type = 'main_api' as const;

  public repository_name: string = WebhooksRepository.name;

  get_messages(input?: Webhook.SearchMessagesInput) {
    return this.response(
      this.request<Webhook.Paginated>({
        url: this.url + '/messages',
        method: 'GET',
        params: input,
      }),
    );
  }
}
