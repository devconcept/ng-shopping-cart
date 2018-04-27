## CartCheckoutComponent
<span class="badge badge-warning">Component</span>

Selector: `<cart-checkout>`

Renders a button to initiate checkout of the cart.



<blockquote class="doc note bg-light">This component captures clicks events bubbling from its projected content. Make sure the event keeps bubbling only when
you want the checkout operation to start.</blockquote>



*@Input()*


#### `custom`
Type:`boolean`

Initial value: `false`

If true displays a default button provided by the component. When false projects the contents of the component.



#### `buttonText`
Type:`string`

Initial value: `'Checkout'`

Changes the default text of the component's button.



#### `service`
Type:`CheckoutType`

Initial value: `'log'`

Sets the type of service to be used when initiating the checkout.



#### `settings`
Type:`CheckoutSettings`

Depending on the type of the service you might need to add some configuration to it. This input allows you to change that
configuration.




*@Output()*



#### `checkout`
Emits: `any`

Emits the result of the checkout operation. When [service] is set to `'paypal'` this event is never emitted.



#### `error`
Emits: `any`

When the [service] is set to `'http'` and the checkout operation fails the error thrown can be captured using this output.







































### How to use

<div class="how-to-use">With a custom button or projected content</div>
```html
<cart-checkout [custom]="true">
   <button type="button" class="my-custom-class">Add item</button>
</cart-checkout>
```


<div class="how-to-use">With different text and classes</div>
```html
<cart-checkout [buttonText]="'Add item'" buttonClass="'my-custom-class'">
</cart-checkout>
```


<div class="how-to-use">Using http in a protected endpoint</div>
```html
<cart-checkout [service]="'http'" settings="settings">
</cart-checkout>
```
```typescript
export class MyComponent {
  settings: CheckoutHttpSettings = {
    method: 'post',
    url: 'http://myapi.com/',
    options: { headers: { Authorization: 'Bearer my-auth-token' } }
  };
}
```


<div class="how-to-use">Using the PayPal service</div>
```html
<cart-checkout [service]="'paypal'" settings="settings">
</cart-checkout>
```
```typescript
export class MyComponent {
 settings: CheckoutPaypalSettings = {
   business: 'myaccount@paypal.com',
   itemName: 'myMarketplaceAppCart',
   itemNumber: '1234',
   currencyCode: 'USD',
   noNote: '1'
 };
}
```



