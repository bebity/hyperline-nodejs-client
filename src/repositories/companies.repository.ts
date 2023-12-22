import { Injectable } from '@nestjs/common';
import { AbstractBasicRepository } from './abstracts/basic-repository.abstract';
import { Company } from 'src/namespaces/company.namespace';
import { ApiPaginatedResponse } from 'src/types/api-common.type';

@Injectable()
export class CompaniesRepository extends AbstractBasicRepository {
  public base_url = '/v1/companies';

  public api_type = 'main_api' as const;

  public repository_name: string = CompaniesRepository.name;

  list() {
    return this.response(
      this.request<ApiPaginatedResponse<Company.Item>>({
        url: this.url,
        method: 'GET',
      }),
    );
  }
}
