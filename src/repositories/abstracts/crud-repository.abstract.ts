import { AbstractBasicRepository } from './basic-repository.abstract';
import { ApiItem, ApiPaginatedResponse } from 'src/types/api-common.type';

export abstract class AbstractCrudRepository<
  Item extends ApiItem,
  CreateInput,
  UpdateInput,
  SearchInput,
> extends AbstractBasicRepository {
  public create(input: CreateInput) {
    return this.response(
      this.request<Item>({
        url: this.url,
        method: 'POST',
        data: input,
      }),
    );
  }

  public get(id: string) {
    return this.response(
      this.request<Item>({
        url: `${this.url}/${id}`,
        method: 'GET',
      }),
    );
  }

  public list(input?: SearchInput) {
    console.log('input', input);
    return this.response(
      this.request<ApiPaginatedResponse<Item>>({
        url: this.url,
        method: 'GET',
        params: input,
      }),
    );
  }

  public update(id: string, input: UpdateInput) {
    return this.response(
      this.request<Item>({
        url: `${this.url}/${id}`,
        method: 'PUT',
        data: input,
      }),
    );
  }

  public delete(id: string) {
    return this.response(
      this.request<void>({
        url: `${this.url}/${id}`,
        method: 'DELETE',
      }),
    );
  }
}
