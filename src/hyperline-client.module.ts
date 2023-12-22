import { Global, Module } from '@nestjs/common';
import { HyperlineClientOptions } from './types/client.type';
import { HttpModule } from '@nestjs/axios';
import config from './config';
import { CustomersRepository } from './repositories/customers.repository';
import { AnalyticsRepository } from './repositories/analytics.repository';
import { BillableEventsRepository } from './repositories/billable-events.repository';
import { CompaniesRepository } from './repositories/companies.repository';
import { CouponsRepository } from './repositories/coupons.repository';
import { IntegrationsRepository } from './repositories/integrations.repository';
import { InvoicesRepository } from './repositories/invoices.repository';
import { OAuth2Repository } from './repositories/o-auth-2.repository';
import { PaymentsRepository } from './repositories/payments.repository';
import { PlansRepository } from './repositories/plans.repository';
import { PriceConfigurationsRepository } from './repositories/price-configurations.repository';
import { ProductsRepository } from './repositories/products.repository';
import { SubscriptionsV2Repository } from './repositories/subscriptions-v2.repository';
import { ThirdPartyAppsRepository } from './repositories/third-party-apps.repository';
import { WalletsRepository } from './repositories/wallets.repository';
import { WebhooksRepository } from './repositories/webhooks.repository';
import * as qs from 'qs';

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
      ],
    };
  }
}
