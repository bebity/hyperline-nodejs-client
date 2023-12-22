import { Global, Module } from '@nestjs/common';
import { HyperlineClientOptions } from './types';
import { HttpModule } from '@nestjs/axios';
import config from './config';
import {
  BillableEventsRepository,
  CompaniesRepository,
  CouponsRepository,
  IntegrationsRepository,
  InvoicesRepository,
  OAuth2Repository,
  PaymentsRepository,
  PlansRepository,
  PriceConfigurationsRepository,
  ProductsRepository,
  SubscriptionsV2Repository,
  ThirdPartyAppsRepository,
  WalletsRepository,
  WebhooksRepository,
  AnalyticsRepository,
  CustomersRepository,
} from './repositories';
import * as qs from 'qs';
import { HyperlineService } from './services/hyperline.service';

@Global()
@Module({})
export class HyperlineClientModule {
  static forRoot(options: HyperlineClientOptions) {
    return {
      module: HyperlineClientModule,
      imports: [
        HttpModule.register({
          headers: {
            Authorization: `Bearer ${options.api_key}`,
          },
          paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: 'comma' });
          },
        }),
      ],
      providers: [
        {
          provide: 'HYPERLINE_CLIENT_OPTIONS',
          useValue: options,
        },
        {
          provide: 'CONFIG',
          useValue: config,
        },
        AnalyticsRepository,
        BillableEventsRepository,
        CompaniesRepository,
        CouponsRepository,
        CustomersRepository,
        IntegrationsRepository,
        InvoicesRepository,
        OAuth2Repository,
        PaymentsRepository,
        PlansRepository,
        PriceConfigurationsRepository,
        ProductsRepository,
        SubscriptionsV2Repository,
        ThirdPartyAppsRepository,
        WalletsRepository,
        WebhooksRepository,
        HyperlineService,
      ],
      exports: [
        'HYPERLINE_CLIENT_OPTIONS',
        'CONFIG',
        AnalyticsRepository,
        BillableEventsRepository,
        CompaniesRepository,
        CouponsRepository,
        CustomersRepository,
        IntegrationsRepository,
        InvoicesRepository,
        OAuth2Repository,
        PaymentsRepository,
        PlansRepository,
        PriceConfigurationsRepository,
        ProductsRepository,
        SubscriptionsV2Repository,
        ThirdPartyAppsRepository,
        WalletsRepository,
        WebhooksRepository,
        HyperlineService,
      ],
    };
  }
}
