import { Injectable } from '@nestjs/common';
import { AbstractBasicRepository } from './abstracts/basic-repository.abstract';
import { ApiPaginatedResponse } from 'src/types/api-common.type';
import { Product } from 'src/namespaces/product.namespace';

@Injectable()
export class ProductsRepository extends AbstractBasicRepository {
  public base_url = '/v1/products';

  public api_type = 'main_api' as const;

  public repository_name: string = ProductsRepository.name;

  get(id: string) {
    return this.response(
      this.request<Product.Item>({
        url: `${this.url}/${id}`,
        method: 'GET',
      }),
    );
  }

  list(input?: Product.SearchInput) {
    return this.response(
      this.request<ApiPaginatedResponse<Product.Item>[]>({
        url: this.url,
        method: 'GET',
        params: input,
      }),
    );
  }

  create(data: Product.CreateInput) {
    return this.response(
      this.request<Product.Item>({
        url: this.url,
        method: 'POST',
        data,
      }),
    );
  }

  update(id: string, data: Product.UpdateInput) {
    return this.response(
      this.request<Product.Item>({
        url: `${this.url}/${id}`,
        method: 'PUT',
        data,
      }),
    );
  }
}
