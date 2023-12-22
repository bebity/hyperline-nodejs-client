
# Hyperline Node.js Client
![enter image description here](https://cdn.tech.eu/uploads/2023/06/hyperline1-822.png)
The [Hyperline](https://www.hyperline.co/) Client Library offers a full suite of functionalities for SaaS platforms, enabling efficient management of billing, customer data, subscriptions, and more. It supports promise-based and observable-based programming styles.
[Hyperline documentation](https://docs.hyperline.co/docs/introduction/welcome)

## Setup and Initialization

### With function
Initialize the client using `create_hyperline_client` function, which requires an object of type `HyperlineClientOptions`.

```javascript
const client = await create_hyperline_client(options);
```

### In a RxJS Container
In an RxJS environment like NestJS, you can inject the module into your imports for full access to all repositories.

```javascript
@Module({
  imports: [HyperlineClientModule.forRoot(options)],
})
```

## Library Options

`HyperlineClientOptions` type definition:

```javascript
type HyperlineClientOptions = {
  api_key: string;
  events_ingestion_api_auth?: { // required for use events_ingestion_api
    username: string;
    password: string;
  };
  environment: "sandbox"  |  "production"  |  ApiEnvironment;
};
```
## Method Response Types
All methods return a promise and an observable.

### Promise Usage
```javascript
const response = client.customers.list();
const data = await response.promise();
```

### Observable Usage
```javascript
const response = client.customers.list();
response.observable.subscribe(data => {
  console.log(data);
});
```

# Feature Documentation

## Customers Repository

### Create Customer
```javascript
const input: Customer.CreateInput = { /* Customer data */ };
const new_customer = await client.customers.create(input).promise();
```

### Retrieve Customer
```javascript
const customer = await client.customers.get('CUSTOMER_ID').promise();
```

### Update Customer
```javascript
const input: Customer.UpdateInput = { /* Updated customer data */ };
const updated_customer = await client.customers.update('CUSTOMER_ID', input).promise();
```

### List Customers
```javascript
const customers = await client.customers.list(/* Optional filters */).promise();
```

### Archive Customer
```javascript
const archived_customer = await client.customers.archive('CUSTOMER_ID').promise();
```

## Companies Repository
List company information.

```javascript
const companies = await client.companies.list().promise();
```

## Coupons Repository

### Create Coupon
```javascript
const input: Coupon.CreateInput = { /* Coupon data */ };
const new_coupon = await client.coupons.create(input).promise();
```

### Retrieve Coupon
```javascript
const coupon = await client.coupons.get('COUPON_ID').promise();
```

### Update Coupon
```javascript
const input: Coupon.UpdateInput = { /* Updated coupon data */ };
const updated_coupon = await client.coupons.update('COUPON_ID', input).promise();
```

### List Coupons
```javascript
const coupons = await client.coupons.list(/* Optional filters */).promise();
```

### Delete Coupon
```javascript
const deleted_coupon = await client.coupons.delete('COUPON_ID').promise();
```

## Integrations Repository
Create tokens for integration components.

```javascript
const token = await client.integrations.create_component_token('CUSTOMER_ID').promise();
```

## Products Repository

### Create Product
```javascript
const input: Product.CreateInput = { /* Product data */ };
const product = await client.products.create(input).promise();
```

### Retrieve Product
```javascript
const product = await client.products.get('PRODUCT_ID').promise();
```

### Update Product
```javascript
const input: Product.UpdateInput = { /* Updated product data */ };
const updated_product = await client.products.update('PRODUCT_ID', input).promise();
```

### List Products
```javascript
const products = await client.products.list(/* Optional filters */).promise();
```

## Invoices Repository

### Create One-Off Invoice
```javascript
const input: Invoice.CreateOneOffInput = { /* Invoice data */ };
const invoice = await client.invoices.create_one_off(input).promise();
```

### Retrieve Invoice
```javascript
const invoice = await client.invoices.get('INVOICE_ID').promise();
```

### List Invoices
```javascript
const invoices = await client.invoices.list(/* Optional filters */).promise();
```

### Download Invoice
```javascript
const invoice = await client.invoices.download('INVOICE_ID', 'Path/to/save').promise();
```

## Payments Repository

### Create Payment
```javascript
const input: Payment.CreateInput = { /* Payment data */ };
const payment = await client.payments.create(input).promise();
```

## Plans Repository
Retrieve and list plans.

### Retrieve Plan
```javascript
const plan = await client.plans.get('PLAN_ID').promise();
```

## Price Configurations Repository

### Update Price Configurations
```javascript
const input: PriceConfiguration.UpdatePricesInput = { /* Price configuration data */ };
const price_configuration = await client.price_configurations.update_prices('PRICE_CONFIGURATION_ID', input).promise();
```

## Subscriptions V2 Repository

### Create Subscription
```javascript
const input: SubscriptionV2.CreateInput = { /* Subscription data */ };
const subscription = await client.subscriptions_v2.create(input).promise();
```

### Retrieve Subscription
```javascript
const subscription = await client.subscriptions_v2.get('SUBSCRIPTION_ID').promise();
```

## Third Party Apps Repository

### Create App
```javascript
const input: Third Party App.CreateInput = { /* App data */ };
const app = await client.third_party_integrations.create(input).promise();
```

## Wallets Repository

### Create Wallet
```javascript
const input: Wallet.CreateInput = { /* Wallet data */ };
const wallet = await client.wallets.create(input).promise();
```

### Retrieve Wallet
```javascript
const wallet = await client.wallets.get('WALLET_ID').promise();
```

## Webhooks Repository
Retrieve webhook messages.

```javascript
const messages = await client.webhooks.get_messages().promise();
```

# Conclusion

The Hyperline Client Library, with its comprehensive and flexible architecture, serves as an essential tool for SaaS platforms to interact with Hyperline's billing API. Developed and maintained by [Bebity.io](https://bebity.io/), it stands as a testament to modern, efficient API integration in the Node.js ecosystem.
![enter image description here](https://assets-global.website-files.com/64556a01fe44f3ada3b38f81/64557f617006e1e4ab57f9ca_bebity-sticker-2.png)