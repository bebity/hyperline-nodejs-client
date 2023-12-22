import { NestFactory } from '@nestjs/core';
import { HyperlineClientModule } from './hyperline-client.module';
import { Config, HyperlineClientOptions } from './types';
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
import { HttpService } from '@nestjs/axios';
import { HyperlineService } from './services/hyperline.service';

export class HyperlineClient {
  context: {
    app: HyperlineClientModule;
    options: HyperlineClientOptions;
    config: Config;
    http: HttpService;
  };
  analytics: AnalyticsRepository;
  billable_events: BillableEventsRepository;
  companies: CompaniesRepository;
  coupons: CouponsRepository;
  customers: CustomersRepository;
  integrations: IntegrationsRepository;
  invoices: InvoicesRepository;
  o_auth2: OAuth2Repository;
  payments: PaymentsRepository;
  plans: PlansRepository;
  price_configurations: PriceConfigurationsRepository;
  products: ProductsRepository;
  subscriptions_v2: SubscriptionsV2Repository;
  third_party_integrations: ThirdPartyAppsRepository;
  wallets: WalletsRepository;
  webhooks: WebhooksRepository;
}

export async function create_hyperline_client(
  options: HyperlineClientOptions,
): Promise<HyperlineClient> {
  const app = await NestFactory.createApplicationContext(
    HyperlineClientModule.forRoot(options),
  );
  return {
    context: {
      app,
      options,
      config: app.get('CONFIG'),
      http: app.get(HttpService),
    },
    ...app.get(HyperlineService),
  };
}
