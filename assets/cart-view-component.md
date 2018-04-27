## CartViewComponent
<span class="badge badge-warning">Component</span>

Selector: `<cart-view>`

Renders a view of the cart.



*@Input()*


#### `display`
Type:`CartViewDisplay`

Initial value: `'fixed'`

Changes the appearance how the cart view displays in different screen sizes



#### `images`
Type:`boolean`

Initial value: `true`

Whether to include images in the cart or not.



#### `emptyText`
Type:`string`

Initial value: `'Your cart is empty'`

The text to show when the cart has no items in it.



#### `nameHeaderText`
Type:`string`

Initial value: `'Name'`

The text to display in the header of the name column.



#### `quantityHeaderText`
Type:`string`

Initial value: `'Quantity'`

The text to display in the header of the quantity column.



#### `priceHeaderText`
Type:`string`

Initial value: `'Price'`

The text to display in the header of the price column.



#### `totalHeaderText`
Type:`string`

Initial value: `'Total'`

The text to display in the header of the total per item column.



#### `taxFooterText`
Type:`string`

Initial value: `'Tax'`

The text to display in the tax section of the footer.



#### `shippingFooterText`
Type:`string`

Initial value: `'Shipping'`

The text to display in the shipping section of the footer.



#### `totalFooterText`
Type:`string`

Initial value: `'Total'`

The text to display in the total section of the footer.
















































### How to use

<div class="how-to-use">Using responsive layout</div>
```html
<cart-view [display]="'responsive'">
</cart-view>
```


<div class="how-to-use">No images and using scrollbars on small screens</div>
```html
<cart-view [images]="false" [display]="'responsive-table'">
</cart-view>
```


<div class="how-to-use">Using different text for headers</div>
```html
<cart-view [emptyText]="headers.empty" [nameHeaderText]="headers.name" [quantityHeaderText]="headers.quantity"
 [priceHeaderText]="headers.quantity" [totalHeaderText]="headers.total" [taxFooterText]="footers.tax"
 [shippingFooterText]="footers.shipping" [totalFooterText]="footers.total"
>
</cart-view>
```
```typescript
export class MyComponent {
  headers = {
    empty: 'No items. Add some to the cart',
    name: 'Description',
    quantity: 'Amount',
    price: 'Cost',
    total: 'Total x item',
  }
  footers = {
    tax: 'Tax rate',
    shipping: 'Shipping cost',
    total: 'Total cost'
  }
}
```


