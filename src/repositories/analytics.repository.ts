import { Injectable, Logger } from '@nestjs/common';
import { AbstractBasicRepository } from './abstracts/basic-repository.abstract';
import { Analytics } from 'src/namespaces/analytics.namespace';

@Injectable()
export class AnalyticsRepository extends AbstractBasicRepository {
  public base_url = '/v1/analytics';

  public api_type = 'main_api' as const;

  public repository_name: string = AnalyticsRepository.name;

  get() {
    return this.response(
      this.request<Analytics.Item>({
        url: this.url,
        method: 'GET',
      }),
    );
  }
}
