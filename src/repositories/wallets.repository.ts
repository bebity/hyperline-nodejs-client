import { Injectable } from '@nestjs/common';
import { AbstractBasicRepository } from './abstracts/basic-repository.abstract';
import { Wallet } from 'src/namespaces/wallet.namespace';
import { ApiPaginatedResponse } from 'src/types/api-common.type';

@Injectable()
export class WalletsRepository extends AbstractBasicRepository {
  public base_url = '/v1/wallets';

  public api_type = 'main_api' as const;

  public repository_name: string = WalletsRepository.name;

  get_settings() {
    return this.response(
      this.request<Wallet.Settings>({
        url: this.url + '/settings',
        method: 'GET',
      }),
    );
  }

  update_settings(data: Wallet.UpdateSettingsInput) {
    return this.response(
      this.request<Wallet.Settings>({
        url: this.url + '/settings',
        method: 'PUT',
        data,
      }),
    );
  }

  list(input?: Wallet.SearchInput) {
    return this.response(
      this.request<ApiPaginatedResponse<Wallet.Item>>({
        url: this.url,
        method: 'GET',
        params: input,
      }),
    );
  }

  create(data: Wallet.CreateInput) {
    return this.response(
      this.request<Wallet.Item>({
        url: this.url,
        method: 'POST',
        data,
      }),
    );
  }

  get(id: string) {
    return this.response(
      this.request<Wallet.Item>({
        url: `${this.url}/${id}`,
        method: 'GET',
      }),
    );
  }

  update(id: string, data: Wallet.UpdateInput) {
    return this.response(
      this.request<Wallet.Item>({
        url: `${this.url}/${id}`,
        method: 'PUT',
        data,
      }),
    );
  }

  load(id: string, data: Wallet.LoadInput) {
    return this.response(
      this.request<Wallet.Item>({
        url: `${this.url}/${id}/load`,
        method: 'POST',
        data,
      }),
    );
  }

  get_transactions(id: string, input?: Wallet.GetWalletTransactionsInput) {
    return this.response(
      this.request<ApiPaginatedResponse<Wallet.WalletTransaction>>({
        url: `${this.url}/${id}/transactions`,
        method: 'GET',
        params: input,
      }),
    );
  }
}
