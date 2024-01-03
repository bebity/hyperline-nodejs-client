import { Injectable } from '@nestjs/common';
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
} from '../repositories';

@Injectable()
export class HyperlineService {
  constructor(
    public readonly analytics: AnalyticsRepository,
    public readonly billableEvents: BillableEventsRepository,
    public readonly companies: CompaniesRepository,
    public readonly coupons: CouponsRepository,
    public readonly customers: CustomersRepository,
    public readonly integrations: IntegrationsRepository,
    public readonly invoices: InvoicesRepository,
    public readonly oAuth2: OAuth2Repository,
    public readonly payments: PaymentsRepository,
    public readonly plans: PlansRepository,
    public readonly priceConfigurations: PriceConfigurationsRepository,
    public readonly products: ProductsRepository,
    public readonly subscriptions_v2: SubscriptionsV2Repository,
    public readonly thirdPartyApps: ThirdPartyAppsRepository,
    public readonly wallets: WalletsRepository,
    public readonly webhooks: WebhooksRepository,
  ) {}
}
