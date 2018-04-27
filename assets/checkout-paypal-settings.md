## CheckoutPaypalSettings
<span class="badge badge-warning">Interface</span>

The configuration for the checkout operation if the service is set to Paypal

#### `business`

Type: `string`

Your PayPal ID or an email address associated with your PayPal account. Email addresses must be confirmed.

#### `itemName`

Type: `string`

Description of item being sold. If you are collecting aggregate payments, the value can be a summary of all items purchased, a
tracking number, or a generic term such as, subscription. If you omit this variable, buyers see a field in which they can enter the
item name.

#### `itemNumber`

Type: `string`

Pass-through variable for you to track product or service purchased or the contribution made.

#### `currencyCode`

Type: `string`

The currency of the payment

#### `noNote`

Type: `string`

Do not prompt buyers to include a note with their payments. Valid values are "0" and "1"

