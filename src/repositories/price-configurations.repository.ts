import { Injectable, Logger } from '@nestjs/common';
import { AbstractBasicRepository } from './abstracts/basic-repository.abstract';
import { Analytics } from 'src/namespaces/analytics.namespace';
import { Payment } from 'src/namespaces/payment.namespace';
import { Plan } from 'src/namespaces/plan.namespace';
import { ApiPaginatedResponse } from 'src/types/api-common.type';
import queryString from 'query-string';
import { PriceConfiguration } from 'src/namespaces/price-configuration.namespace';

@Injectable()
export class PriceConfigurationsRepository extends AbstractBasicRepository {
  public base_url = '/v1/price-configurations';

  public api_type = 'main_api' as const;

  public repository_name: string = PriceConfigurationsRepository.name;

  update_prices(id: string, data: PriceConfiguration.UpdatePricesInput) {
    return this.response(
      this.request<PriceConfiguration.Item>({
        url: `${this.url}/${id}/prices`,
        method: 'POST',
        data,
      }),
    );
  }
}
