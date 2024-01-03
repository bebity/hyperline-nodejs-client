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

export class HyperlineClient {
  context: {
    // app: HyperlineClientModule;
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
      // app,
      options,
      config: app.get('CONFIG'),
      http: app.get(HttpService),
    },
    analytics: app.get(AnalyticsRepository),
    billable_events: app.get(BillableEventsRepository),
    companies: app.get(CompaniesRepository),
    coupons: app.get(CouponsRepository),
    customers: app.get(CustomersRepository),
    integrations: app.get(IntegrationsRepository),
    invoices: app.get(InvoicesRepository),
    o_auth2: app.get(OAuth2Repository),
    payments: app.get(PaymentsRepository),
    plans: app.get(PlansRepository),
    price_configurations: app.get(PriceConfigurationsRepository),
    products: app.get(ProductsRepository),
    subscriptions_v2: app.get(SubscriptionsV2Repository),
    third_party_integrations: app.get(ThirdPartyAppsRepository),
    wallets: app.get(WalletsRepository),
    webhooks: app.get(WebhooksRepository),
  };
}
