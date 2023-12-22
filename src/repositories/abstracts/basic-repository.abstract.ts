import { HttpService } from '@nestjs/axios';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { Observable, firstValueFrom } from 'rxjs';
import { InjectConfig } from '../../injects/config.inject';
import { InjectClientOptions } from '../../injects/options.inject';
import {
  ApiEnvironment,
  ApiEnvironmentsEnum,
  Config,
  HyperlineClientOptions,
  HyperlineError,
} from '../../types/client.type';
import { Logger } from '@nestjs/common';

export abstract class AbstractBasicRepository {
  constructor(
    @InjectClientOptions()
    protected readonly client_options: HyperlineClientOptions,
    @InjectConfig()
    protected readonly config: Config,
    protected readonly http: HttpService,
  ) {}

  public abstract api_type: keyof ApiEnvironment;
  public abstract base_url: string;
  public abstract repository_name: string;

  protected _log: Logger;

  protected get log(): Logger {
    if (!this._log) {
      this._log = new Logger(this.repository_name);
    }
    return this._log;
  }

  public get api_enviroment(): ApiEnvironment {
    if (typeof this.client_options.environment === 'string') {
      return this.config.environments[this.client_options.environment];
    }
    return this.client_options.environment as ApiEnvironment;
  }

  protected get_url(env: keyof ApiEnvironment, base_url: string): string {
    return `${this.api_enviroment[this.api_type]}/${base_url}`.replaceAll(
      '//',
      '/',
    );
  }

  public get url(): string {
    // return `${this.api_enviroment[this.api_type]}/${this.base_url}`.replaceAll(
    //   '//',
    //   '/',
    // );
    return this.get_url(this.api_type, this.base_url);
  }

  private can_make_request() {
    if (
      !this.client_options.events_ingestion_api_auth &&
      this.api_type === 'events_ingestion_api'
    ) {
      throw new HyperlineError(
        'For use `events_ingestion_api` you must provide `events_ingestion_api_auth` in client options',
      );
    }
    return true;
  }

  protected get_auth_header() {
    if (this.api_type === 'events_ingestion_api') {
      return {
        Authorization: `Basic ${Buffer.from(
          `${this.client_options.events_ingestion_api_auth.username}:${this.client_options.events_ingestion_api_auth.password}`,
        ).toString('base64')}`,
      };
    }
    return {};
  }

  protected request<T>(conf: AxiosRequestConfig): Observable<T> {
    this.can_make_request();
    return new Observable((observer) => {
      this.http
        .request<T>({
          ...conf,
          headers: {
            ...conf.headers,
            ...this.get_auth_header(),
          },
        })
        .subscribe({
          next: (result) => {
            this.log.log(`[${conf.method}] ${result.status} ${conf.url}`);
            observer.next(result.data);
          },
          error: (err: AxiosError) => {
            this.log.error(
              `[${conf.method}] ${err.response?.status} ${conf?.url}`,
              err,
            );
            observer.error(HyperlineError.fromError(err));
          },
          complete: () => observer.complete(),
        });
    });
  }

  protected response<T>(obs: Observable<T>) {
    return {
      observable: obs,
      promise: () => firstValueFrom(obs),
    };
  }
}
