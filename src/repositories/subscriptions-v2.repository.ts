import { Injectable } from '@nestjs/common';
import { AbstractBasicRepository } from './abstracts/basic-repository.abstract';
import { ApiPaginatedResponse } from 'src/types/api-common.type';
import { SubscriptionV2 } from 'src/namespaces/subscription-v2.namespace';

@Injectable()
export class SubscriptionsV2Repository extends AbstractBasicRepository {
  public base_url = '/v2/subscriptions';

  public api_type = 'main_api' as const;

  public repository_name: string = SubscriptionsV2Repository.name;

  create_update(id: string, data: SubscriptionV2.CreateUpdateInput.Input) {
    return this.response(
      this.request<SubscriptionV2.Item>({
        url: this.get_url(this.api_type, `/v1/subscriptions/${id}/update`),
        method: 'POST',
        data,
      }),
    );
  }

  cancel(id: string, input: SubscriptionV2.CancelInput) {
    return this.response(
      this.request<SubscriptionV2.Item>({
        url: this.get_url(this.api_type, `/v1/subscriptions/${id}/cancel`),
        method: 'POST',
        data: input,
      }),
    );
  }

  list(input?: SubscriptionV2.SearchInput) {
    return this.response(
      this.request<ApiPaginatedResponse<SubscriptionV2.Item>[]>({
        url: this.url,
        method: 'GET',
        params: input,
      }),
    );
  }

  create(data: SubscriptionV2.CreateInput) {
    return this.response(
      this.request<SubscriptionV2.Item>({
        url: this.url,
        method: 'POST',
        data,
      }),
    );
  }

  get(id: string) {
    return this.response(
      this.request<SubscriptionV2.Item>({
        url: `${this.url}/${id}`,
        method: 'GET',
      }),
    );
  }

  refresh_seat_products(id: string) {
    return this.response(
      this.request<SubscriptionV2.RefreashSeatProductsResponse[]>({
        url: `${this.url}/${id}/refresh-seat-products`,
        method: 'POST',
      }),
    );
  }
}
