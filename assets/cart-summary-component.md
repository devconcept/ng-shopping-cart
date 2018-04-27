## CartSummaryComponent
<span class="badge badge-warning">Component</span>

Selector: `<cart-summary>`

Renders a summary of the contents of the cart.



*@Input()*


#### `icon`
Type:`string`

The url of an icon to show on the summary. Use this to replace the default icon which is an svg with the image of a shopping cart.



#### `totalPlurals`
Type:`{
    [k: string]: string;
}`

The component uses the i18nPlural pipe to translate the number of items of the cart according to locale rules using the ICU format.
You can use this binding to internationalize you app or to change how values are converted into words.


















### How to use

<div class="how-to-use">With a different icon</div>
```html
<cart-summary [icon]="'http://myapi/assets/icon.svg'"></cart-summary>
```


<div class="how-to-use">Display different words when the cart changes</div>
```html
<cart-summary [totalPlurals]="summaryPlurals"></cart-summary>
```
```typescript
export class MyComponent {
  summaryPlurals = {'=0': 'Empty cart', '=2': 'A couple of items', '=12': 'A dozen items', 'other': '# items'}
}
```


