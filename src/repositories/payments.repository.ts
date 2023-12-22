import { Injectable, Logger } from '@nestjs/common';
import { AbstractBasicRepository } from './abstracts/basic-repository.abstract';
import { Analytics } from 'src/namespaces/analytics.namespace';
import { Payment } from 'src/namespaces/payment.namespace';

@Injectable()
export class PaymentsRepository extends AbstractBasicRepository {
  public base_url = '/v1/payments';

  public api_type = 'main_api' as const;

  public repository_name: string = PaymentsRepository.name;

  create(data: Payment.CreateInput.Input) {
    return this.response(
      this.request<Payment.Item>({
        url: this.url,
        method: 'POST',
        data,
      }),
    );
  }
}
