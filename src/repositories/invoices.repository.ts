import { Injectable } from '@nestjs/common';
import { AbstractBasicRepository } from './abstracts/basic-repository.abstract';
import { Invoice } from '../namespaces/invoice.namespace';
import { ApiPaginatedResponse } from 'src/types/api-common.type';
import { Transaction } from '../namespaces/transaction.namespace';
import { Observable } from 'rxjs';
import { HyperlineError } from '../types/client.type';
import * as fs from 'fs';

@Injectable()
export class InvoicesRepository extends AbstractBasicRepository {
  public base_url = 'v1/invoices';

  public api_type = 'main_api' as const;

  public repository_name: string = InvoicesRepository.name;

  list(input?: Invoice.SearchInput) {
    return this.response(
      this.request<ApiPaginatedResponse<Invoice.Item>>({
        url: this.url,
        method: 'GET',
        params: input,
      }),
    );
  }

  create_one_off(input: Invoice.CreateOneOffInput) {
    return this.response(
      this.request<Invoice.Item>({
        url: this.url,
        method: 'POST',
        data: input,
      }),
    );
  }

  get(id: string) {
    return this.response(
      this.request<Invoice.Item>({
        url: `${this.url}/${id}`,
        method: 'GET',
      }),
    );
  }

  download(id: string, path?: string) {
    return this.response(
      new Observable((subscriber) => {
        this.request<string>({
          url: `${this.url}/${id}/download`,
          method: 'GET',
        }).subscribe({
          next: (response) => {
            if (path) {
              try {
                fs.writeFileSync(path, response, { encoding: 'utf-8' });
              } catch (error) {
                subscriber.error(HyperlineError.fromError(error));
              }
            }
            subscriber.next(response);
          },
          error: (error) => {
            subscriber.error(HyperlineError.fromError(error));
          },
          complete: () => {
            subscriber.complete();
          },
        });
      }),
    );
  }

  create_transaction(id: string, input: Transaction.CreateInput) {
    return this.response(
      this.request<Transaction.Item>({
        url: `${this.url}/${id}/transactions`,
        method: 'POST',
        data: input,
      }),
    );
  }
}
