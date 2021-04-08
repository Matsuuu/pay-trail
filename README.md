<h1 align="center">Paytrail Web Component E2</h1>

> :exclamation: 3rd party developed Web Component library for creating payments with [Paytrail E2 Interface](https://docs.paytrail.com/payments/e2-interface/).

## Table of Contents

-   [\<paytrail-web-component-e2>](#paytrail-web-component-e2)
    -   [Installation](#installation)
        -   [NPM](#npm)
        -   [CDN](#cdn)
    -   [Attributes](#attributes)
    -   [Methods](#methods)
    -   [Product attributes](#product-attributes)
    -   [Examples](#examples)
        -   [Setting products](#setting-products)
        -   [Authcode generation](#authcode-generation)
            -   [Generating the authcode in the front-end](#generating-the-authcode-in-the-front-end)
            -   [Generating the authcode in the back-end](#generating-the-authcode-in-the-back-end)
        -   [Form Submission](#form-submission)
            -   [Minimal Setup](#minimal-setup)
            -   [Using the required fields](#using-the-required-fields)
            -   [Using all fields](#using-all-fields)
            -   [Directing to a certain payment provider](#directing-to-a-certain-payment-provider)
    -   [Payment Methods](#payment-methods)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

Easy to use plug-and-play Web Component for Paytrail integrations.

Makes use of the E2 Payments API and eases the process of creating a Paytrail Payment gateway.

Extremely easy to set up. Uses the testing credentials, if none are probided, so you can easily get into demoing.

## Installation

paytrail-web-component-e2 will be available as a NPM package and through a CDN.

#### NPM

```bash
npm install @paytrail/web-component-e2
```

#### CDN

```html
<script src="https://unpkg.com/@paytrail/web-component-e2"></script>
```

## Usage

Setup examples can be found in the [setup](#minimal-setup) region of the README.

Example use cases for the generation of auth codes and handling products can be found in the [examples](#examples) region of the README.

For the latest information and instructions, [see the Official Paytrail Documentation](https://docs.paytrail.com).

## Attributes

| Attribute                         | Description                                                                                                                                            | Validation                                                                                                                                                                  | Required |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `merchant_authentication_hash`    | Merchant Secret. Used to generate the AUTHCODE if using `calculateAuthCodeString` and calculating the code in the frontend.                            |                                                                                                                                                                             |          |
| `amount`                          | [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#amount-)                                                              | Float between 0.65–499999.99 (10)                                                                                                                                           | X        |
| `authcode`                        | [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#authcode-)                                                            | 0-9, A-Z. (64)                                                                                                                                                              | X        |
| `expiration_for_payment_creation` | [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#expiration_for_payment_creation-)                                     | ISO-8601 notation datetime with time zone                                                                                                                                   |          |
| `locale`                          | [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#locale-)                                                              | fi\*FI, sv_SE, and en_US                                                                                                                                                    |          |
| `merchant_id`                     | [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#merchant_id-)                                                         | Numeric string. (11)                                                                                                                                                        | X        |
| `msg_settlement_payer`            | [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#msg_settlement_payer-)                                                | Unicode alphabets and ()[]{}\*+-\_,.\"'                                                                                                                                     |          |
| `msg_ui_merchant_panel`           | [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#msg_ui_merchant_panel-)                                               | Unicode alphabets and ()[]{}\*+-\_,.\"'                                                                                                                                     |          |
| `msg_ui_payment_method`           | [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#msg_ui_payment_method-)                                               | Unicode alphabets and ()[]{}\*+-\_,.\"'                                                                                                                                     |          |
| `order_number`                    | [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#order_number-) If no order number is provided, one will be generated. | 0-9, a-z, A-Z and ()[]{}\*+-\_,                                                                                                                                             | X        |
| `params_in`                       | [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#params_in-)                                                           | 0-9, A-Z, [],\_. (4096)                                                                                                                                                     | X        |
| `params_out`                      | [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#params_out-)                                                          | 0-9, A-Z, [],\_. (255)                                                                                                                                                      | X        |
| `payer_company_name`              | [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#payer_company_name-)                                                  | Unicode alphabets and ()[]{}_+-\_,:&!?@#\$£=_;~/\"'.                                                                                                                        |          |
| `payer_person_addr_country`       | [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#payer_person_addr_country-)                                           | a-z, A-Z. (2)                                                                                                                                                               |          |
| `payer_person_addr_postal_code`   | [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#payer_person_addr_postal_code-)                                       | 0-9, a-z, A-Z. (16)                                                                                                                                                         |          |
| `payer_person_addr_street`        | [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#payer_person_addr_street-)                                            | Unicode alphabets                                                                                                                                                           |          |
| `payer_person_addr_town`          | [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#payer_person_addr_town-)                                              | Unicode alphabets and ()[]{}_+-\_,:&!?@#\$£=_;~/\"'                                                                                                                         |          |
| `payer_person_email`              | [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#payer_person_email-)                                                  | example@domain.org, max length for example is 64. (255)                                                                                                                     |          |
| `payer_person_firstname`          | [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#payer_person_firstname-)                                              | Unicode alphabets and ()[]{}_+-\_,:&!?@#\$£=_;~/\"'                                                                                                                         |          |
| `payer_person_lastname`           | [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#payer_person_lastname-)                                               | Unicode alphabets and ()[]{}_+-\_,:&!?@#\$£=_;~/\"'                                                                                                                         |          |
| `payer_person_phone`              | [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#payer_person_phone-)                                                  | 0-9, +-. (64)                                                                                                                                                               |          |
| `payment_methods`                 | [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#payment_methods-)                                                     | 0-9 and , (64)                                                                                                                                                              |          |
| `reference_number`                | [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#reference_number-)                                                    | Alphanumeric, either numeric value complying Finnish reference number standard or numeric Finnish reference number in international RF format (e.g. 1232 or RF111232). (20) |          |
| `url_cancel`                      | [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#url_cancel-)                                                          | Valid URL including http(s). URLs that do not include any dots (e.g. http://localhost) are currently not supported. (2048)                                                  | X        |
| `url_notify`                      | [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#url_notify-)                                                          | Valid URL including http(s). URLs that do not include any dots (e.g. http://localhost) are currently not supported. (2048)                                                  |          |
| `url_success`                     | [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#url_success-)                                                         | Valid URL including http(s). URLs that do not include any dots (e.g. http://localhost) are currently not supported. (2048)                                                  | X        |
| `vat_is_included`                 | [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#vat_is_included-)                                                     | 0, 1. (1)                                                                                                                                                                   |          |

## Methods

| Method                    | Type                                          | Description                                                                                                                                                                                                                                                                     |
| ------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `addProducts`             | `(products: Product or Array<Product>): void` | Add product(s) to the transaction. Product fields must match the [fields in the documentation](https://docs.paytrail.com/payments/e2-interface/fields/#product-information)                                                                                                     |
| `calculateAuthCodeString` | `(): void`                                    | Calculates the AUTHCODE string, encrypting it and appending it into the AUTHCODE input field. Assumes that a `merchant_authentication_hash` is provided.                                                                                                                        |
| `getAuthCodeString`       | `(): string`                                  | Generates the AUTHCODE string needed for calculating the AUTHCODE hash. Doesn't append a `merchant_authentication_hash`, instead assumes that the given string is passed to another API and that said API appends the `merchant_authentication_hash` before encrypting the data |
| `setAuthCode`             | `(authcode): string`                          | Sets the authcode into the corresponding input field. Use this if you calculate the authcode in the backend and want to append it as a reaction to e.g. a fetch request.                                                                                                        |
| `getProducts`             | `(): Array<Product>`                          | Returns a Array of Products set into the form                                                                                                                                                                                                                                   |
| `removeProduct`           | `(product: Product): void`                    | Remove a product from the form                                                                                                                                                                                                                                                  |
| `removeProductAtIndex`    | `(index: any): void`                          | Remove a product from the form given a array index                                                                                                                                                                                                                              |
| `setProducts`             | `(products: any): void`                       | Set the products in the form, overwriting the current products                                                                                                                                                                                                                  |
| `submit`                  | `(): void`                                    | Submit the Paytrail form manually                                                                                                                                                                                                                                               |

## Product attributes

| Attribute                  |  Description                                                                                              | Validation                                                     |  Required |
| -------------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | --------- |
| `item_title[N]`            |  [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#item_titlen-)           | Unicode alphabets and ()[]{}_+-\_,:&!?@#\$£=_;~/\"'.           | X         |
| `item_id[N]`               |  [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#item_idn)               | 0-9. (16)                                                      |           |
| `item_quantity[N]`         |  [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#item_quantityn)         | Floating point number. (10)                                    |           |
| `item_unit_price[N]`       |  [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#item_unit_pricen-)      | Floating point number. between –499 999.99 – 499 999.99. (10)  | X         |
| `item_vat_percent[N]`      |  [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#item_vat_percentn-)     | Floating point number. between 0-100. (10)                     | X         |
| `item_discount_percent[N]` |  [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#item_discount_percentn) | Floating point number. (10)                                    |           |
| `item_type[N]`             |  [Paytrail Documentation](https://docs.paytrail.com/payments/e2-interface/fields/#item_typen)             | 1, 2, and 3. (1)                                               |           |

## Examples

### Setting products

Products are not set through HTML attributes, like everything else is within this component. Instead products are added using the API of `<paytrail-web-component-e2>`.

-   `addProducts()` adds the given product(s) into the existing product array, and created the input fields for it.
-   `getProducts()` returns an array with all of the products set in the component
-   `removeProduct()` expect the exact same product, that was added as a parameter, and then removes it from the array
-   `removeProductAtIndex()` removes a product with given index

The API is simply called by selecting the component from the DOM and calling them:

```js
document.querySelector('paytrail-web-component-e2').addProducts(productList);
```

### Authcode generation

The authcode can be generated in two ways:

##### Generating the authcode in the front-end

If you want to generate the authcode in the frontend, you can call `calculateAuthCodeString()`, which will use the `merchant_authentication_hash` provided to generate a authentication code.
The function will return a promise, you can `await` for the generation to finish, and then submit the form manually.

```js
async handleSubmit() {
    await this.paytrailField.calculateAuthCodeString();
    this.paytrailField.submit();
}
```

**_ Generating the authcode in the frontend is not advisable, since you will be exposing your merchant_authentication_hash to the public. _**

##### Generating the authcode in the back-end

Another way of generating the authcode is by getting the authcode string (a string of values, seperated by pipes (|), and passing it to the backend.

```js
const paytrailComponent = document.querySelector("paytrail-web-component-e2");

function handleSubmit() {
    const authCodeString = paytrailComponent.getAuthCodeString();
    const formData = new FormData();
    formData.append('authCodeString', authCodeString);
    fetch('http://localhost:3000/authcode', {
        method: 'POST',
        body: formData,
    })
        .then(res => res.text())
        .then(res => {
            paytrailComponent.setAuthCode(res);
            paytrailComponent.submit();
        });
}

paytrailComponent.addEventListener('paytrail-submit', handleSubmit);

```

In the back end, the operation of generating the code would look something like this:

```js
const sha256 = require("js-sha256");

calculateAuthCode(request) {
    const authCodeString = 'MY_MERCHANT_HASH' + req.body.authCodeString;
    return {authcode: sha256.hex(authCodeString).toUpperCase()};
}
```

### Form Submission

If a authcode has been set for the component, the form submission will launch on the click of the submit button. If however not authcode has been set (for example in cases where you generate it in the backend), a `paytrail-submit` -event is triggered and the default of the form submit is prevented.

```js
```

#### Minimal Setup

```html
<paytrail-web-component-e2>
    <label>Pay Here</label>
</paytrail-web-component-e2>
```

#### Using the required fields

```html
<paytrail-web-component-e2
    MERCHANT_ID="13466"
    URL_SUCCESS="http://www.example.com/success"
    URL_CANCEL="http://www.example.com/cancel"
    ORDER_NUMBER="123456"
    PARAMS_IN="MERCHANT_ID,URL_SUCCESS,URL_CANCEL,ORDER_NUMBER,PARAMS_IN,PARAMS_OUT,AMOUNT"
    PARAMS_OUT="PAYMENT_ID,TIMESTAMP,STATUS"
    AMOUNT="350.00"
    AUTHCODE="BBDF8997A56F97DC0A46C99C88C2EEF9D541AAD59CFF2695D0DD9AF474086D71"
>
    <label>Pay Here</label>
</paytrail-web-component-e2>
```

#### Using all fields

```html
<paytrail-web-component-e2
    MERCHANT_ID="13466"
    URL_SUCCESS="http://www.example.com/success"
    URL_CANCEL="http://www.example.com/cancel"
    ORDER_NUMBER="123456"
    PARAMS_IN="MERCHANT_ID,URL_SUCCESS,URL_CANCEL,ORDER_NUMBER,PARAMS_IN,PARAMS_OUT,MSG_UI_MERCHANT_PANEL,URL_NOTIFY,LOCALE,REFERENCE_NUMBER,PAYMENT_METHODS,PAYER_PERSON_PHONE,PAYER_PERSON_EMAIL,PAYER_PERSON_FIRSTNAME,PAYER_PERSON_LASTNAME,PAYER_COMPANY_NAME,PAYER_PERSON_ADDR_STREET,PAYER_PERSON_ADDR_POSTAL_CODE,PAYER_PERSON_ADDR_TOWN,PAYER_PERSON_ADDR_COUNTRY,AMOUNT"
    PARAMS_OUT="ORDER_NUMBER,PAYMENT_ID,AMOUNT,CURRENCY,PAYMENT_METHOD,TIMESTAMP,STATUS"
    MSG_UI_MERCHANT_PANEL="Order 123456"
    URL_NOTIFY="http://www.example.com/notify"
    LOCALE="en_US"
    REFERENCE_NUMBER="RF111232"
    PAYMENT_METHODS="1"
    PAYER_PERSON_PHONE="01234567890"
    PAYER_PERSON_EMAIL="john.doe@example.com"
    PAYER_PERSON_FIRSTNAME="John"
    PAYER_PERSON_LASTNAME="Doe"
    PAYER_COMPANY_NAME="Test Company"
    PAYER_PERSON_ADDR_STREET="Test Street 1"
    PAYER_PERSON_ADDR_POSTAL_CODE="608009"
    PAYER_PERSON_ADDR_TOWN="Test Town"
    PAYER_PERSON_ADDR_COUNTRY="AA"
>
    <label>Pay Here</label>
</paytrail-web-component-e2>
```

#### Directing to a certain payment provider

Do direct to a payment provider, you just need to supply a single entry into the PAYMENT_METHODS -field.

By providing a `background_image` -property, we can make the button the selected bank's logo.

```html
<paytrail-web-component-e2
    MERCHANT_ID="13466"
    URL_SUCCESS="http://www.example.com/success"
    URL_CANCEL="http://www.example.com/cancel"
    ORDER_NUMBER="123456"
    PARAMS_IN="MERCHANT_ID,URL_SUCCESS,URL_CANCEL,ORDER_NUMBER,PARAMS_IN,PARAMS_OUT,AMOUNT"
    PARAMS_OUT="PAYMENT_ID,TIMESTAMP,STATUS"
    AMOUNT="350.00"
    AUTHCODE="BBDF8997A56F97DC0A46C99C88C2EEF9D541AAD59CFF2695D0DD9AF474086D71"
    PAYMENT_METHODS="52"
>
    <img src="my_bank_icon_url" />
</paytrail-web-component-e2>
```

## Payment Methods

By specifying a `PAYMENT_METHODS` -field, you can create buttons that go straight to the vendor's site.

The payment methods and their codes are listed below

For the most up to date list of all of the payment methods, see the [official documentation](https://docs.paytrail.com/payment-methods/values/)

| Name                    |  Code |
| ----------------------- | ----- |
| Nordea                  | 1     |
| OsuusPankki             | 2     |
| Danske Bank             | 3     |
| Ålandsbanken            | 5     |
| Handelsbanken           | 6     |
|  Paypal                 | 9     |
| S-Pankki                |  10   |
|  Jousto                 | 18    |
| Aktia                   |  50   |
| POP Pankki              |  51   |
| Säästöpankki            | 52    |
| Visa (Nets)             | 53    |
| MasterCard (Nets)       | 54    |
| Diners Club (Nets)      | 55    |
| American Express (Nets) | 56    |
| MobilePay               | 58    |
| Collector Bank          | 60    |
| Oma Säästöpankki        | 61    |
