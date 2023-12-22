import { Injectable, Logger } from '@nestjs/common';
import { AbstractBasicRepository } from './abstracts/basic-repository.abstract';
import { Analytics } from 'src/namespaces/analytics.namespace';
import { Payment } from 'src/namespaces/payment.namespace';
import { Plan } from 'src/namespaces/plan.namespace';
import { ApiPaginatedResponse } from 'src/types/api-common.type';
import queryString from 'query-string';

@Injectable()
export class PlansRepository extends AbstractBasicRepository {
  public base_url = '/v1/plans';

  public api_type = 'main_api' as const;

  public repository_name: string = PlansRepository.name;

  get(id: string) {
    return this.response(
      this.request<Plan.Item>({
        url: `${this.url}/${id}`,
        method: 'GET',
      }),
    );
  }

  list(input?: Plan.SearchInput) {
    return this.response(
      this.request<ApiPaginatedResponse<Plan.Item>[]>({
        url: this.url,
        method: 'GET',
        params: input,
      }),
    );
  }
}
