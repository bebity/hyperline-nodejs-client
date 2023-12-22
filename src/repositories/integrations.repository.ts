import { Injectable, Logger } from '@nestjs/common';
import { AbstractBasicRepository } from './abstracts/basic-repository.abstract';

@Injectable()
export class IntegrationsRepository extends AbstractBasicRepository {
  public base_url = 'v1/integrations';

  public api_type = 'main_api' as const;

  public repository_name: string = IntegrationsRepository.name;

  create_component_token(customer_id: string) {
    return this.response(
      this.request<{
        token: string;
        token_type: 'bearer';
      }>({
        url: `${this.url}/components/token`,
        method: 'POST',
        data: { customer_id },
      }),
    );
  }
}
