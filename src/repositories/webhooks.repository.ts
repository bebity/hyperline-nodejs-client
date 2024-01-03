import { Injectable } from '@nestjs/common';
import { AbstractBasicRepository } from './abstracts/basic-repository.abstract';
import { Webhook } from 'src/namespaces/webhook.namespace';
import * as crypto from 'crypto';

@Injectable()
export class WebhooksRepository extends AbstractBasicRepository {
  public base_url = '/v1/webhooks';

  public api_type = 'main_api' as const;

  public repository_name: string = WebhooksRepository.name;

  public check_signature(
    /** Request headers */
    request_headers: Record<string, string>,
    /** Request raw body (important to use raw/string body and not formatted body) */
    request_body: string,
    /** Webhook secret */
    secret: string,
  ): boolean {
    const {
      'webhook-id': webhook_id,
      'webhook-timestamp': webhook_timestamp,
      'webhook-signature': webhook_signatures,
    } = request_headers;

    const formatted_signatures = (webhook_signatures || '')
      ?.split(' ')
      ?.map((signature) => signature.slice(3));

    if (
      !webhook_id ||
      !webhook_timestamp ||
      !formatted_signatures ||
      !formatted_signatures.length
    )
      return false;

    const signedContent = `${webhook_id}.${webhook_timestamp}.${request_body}`;

    const secretBytes = new Buffer(secret.split('_')[1] as string, 'base64'); //Buffer.from(secret.split("_")[1] as string, "base64");
    const signature = crypto
      .createHmac('sha256', secretBytes)
      .update(signedContent)
      .digest('base64');
    return formatted_signatures.includes(signature);
  }

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
