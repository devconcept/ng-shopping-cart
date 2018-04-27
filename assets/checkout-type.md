## CheckoutType

<span class="badge badge-warning">Type</span>

The service to use when starting the checkout operation

Values: `'log' ` | ` 'http' ` | ` 'paypal'`

Meaning:


`'log'`: Pressing the checkout button renders the cart contents on the console

`'http'`: An http request (usually a POST) is used to send the contents of the cart to a remote server

`'paypal'`: A Paypal standard form payment is initiated with the contents of the cart


