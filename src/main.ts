import { NestFactory } from '@nestjs/core';
import { HyperlineClientModule } from './hyperline-client.module';
import { Config, HyperlineClientOptions } from './types/client.type';
import { CustomersRepository } from './repositories/customers.repository';
import { AnalyticsRepository } from './repositories/analytics.repository';
import { BillableEventsRepository } from './repositories/billable-events.repository';
import { CompaniesRepository } from './repositories/companies.repository';
import { CouponsRepository } from './repositories/coupons.repository';
import { Integration } from './namespaces/integration.namespace';
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
import { HttpService } from '@nestjs/axios';

// test_30d2e3e64e777712c29e2b1220477719eb41fa05f90ede287c6bcb19b4365daa

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
