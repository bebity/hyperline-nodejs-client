import { Injectable } from '@nestjs/common';
import { Customer } from 'src/namespaces/customer.namespace';
import { AbstractCrudRepository } from './abstracts/crud-repository.abstract';

@Injectable()
export class CustomersRepository extends AbstractCrudRepository<
  Customer.Item,
  Customer.CreateInput,
  Customer.UpdateInput,
  Customer.SearchInput
> {
  public base_url = '/v1/customers';

  public api_type = 'main_api' as const;

  public repository_name: string = CustomersRepository.name;

  public archive(id: string) {
    return this.response(
      this.request<Customer.Item>({
        url: `${this.url}/${id}/archive`,
        method: 'PUT',
      }),
    );
  }

  public get_portal_url(id: string) {
    return this.response(
      this.request<{ url: string }>({
        url: `${this.url}/${id}/portal`,
        method: 'GET',
      }),
    );
  }
}
