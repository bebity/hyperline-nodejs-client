import { Injectable, Logger } from '@nestjs/common';
import { AbstractBasicRepository } from './abstracts/basic-repository.abstract';
import { Analytics } from 'src/namespaces/analytics.namespace';
import { ThirdPartyApp } from 'src/namespaces/third-party-app.namespace';

@Injectable()
export class ThirdPartyAppsRepository extends AbstractBasicRepository {
  public base_url = '/v1/apps';

  public api_type = 'main_api' as const;

  public repository_name: string = ThirdPartyAppsRepository.name;

  list() {
    return this.response(
      this.request<ThirdPartyApp.Item[]>({
        url: this.url,
        method: 'GET',
      }),
    );
  }

  create(data: ThirdPartyApp.CreateInput) {
    return this.response(
      this.request<ThirdPartyApp.Item>({
        url: this.url,
        method: 'POST',
        data,
      }),
    );
  }

  update(data: ThirdPartyApp.UpdateInput) {
    return this.response(
      this.request<ThirdPartyApp.Item>({
        url: this.url,
        method: 'PUT',
        data,
      }),
    );
  }

  delete(id: string) {
    return this.response(
      this.request<ThirdPartyApp.Item>({
        url: `${this.url}/${id}`,
        method: 'DELETE',
      }),
    );
  }
}
