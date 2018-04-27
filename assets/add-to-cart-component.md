## AddToCartComponent
<span class="badge badge-warning">Component</span>

Selector: `<add-to-cart>`

A component to add items to the cart by pressing a button. Has different built-in editors to select quantity.



<blockquote class="doc note bg-light">This component captures click events that bubble from its projected content if you are using [custom]=true therefore if
you have other html content other than buttons inside you must stop the event propagation unless the click originated in the button that
add the items to the cart.</blockquote>



*@Input()*


#### `custom`
Type:`boolean`

Initial value: `false`

If true displays a default button provided by the component, otherwise projects the contents of the component to be used as a button.



#### `item`
Type:`CartItem`

This input is required. The item that will be added to the cart on click.
If you specify an editor using the type input the quantity of the item might be modified prior to insertion in the service.



#### `buttonText`
Type:`string`

Initial value: `'Add to cart'`

Changes the default text of the component's button.



#### `buttonClass`
Type:`string`

Initial value: `'add-to-cart-button'`

Changes the default CSS class of the component's button.



#### `type`
Type:`AddToCartType`

Initial value: `'button'`

Renders a button or a button with an editor to select the quantity of the item that will be added in the cart. When it has a value
other than 'button' an editor is displayed depending on the selected [type]; it can be a `<select>`, or a text or a number `<input>`.



#### `position`
Type:`AddToCartPosition`

Initial value: `'left'`

Sets the position where the editor will be placed. If the [type] is set to 'button' no editor is displayed and this setting has
no effect.



#### `dropdown`
Type:`DropdownValue[]`

If [type] is set 'dropdown' it can be used to set the options of the rendered `<select>` editor. Is an array of objects with label and
a value properties used to populate the select's `<option>` elements.



#### `quantity`
Type:`number`

If you use this binding you can easily override the quantity that will be added to the cart when the button is clicked.

> When the [type] is **not** set to 'button' this binding is ignored and the value from the editor is used instead.




*@Output()*



#### `change`
Emits: `number`

This event is fired when the component uses an editor and its value is changed by the user.



#### `added`
Emits: `CartItem`

This event is fired when the item is added to the cart.































### How to use

<div class="how-to-use">With a custom button or projected content</div>
```html
<add-to-cart [item]="item" [custom]="true">
   <button type="button" class="my-custom-class">Add item</button>
</add-to-cart>
```


<div class="how-to-use">With different text and classes</div>
```html
<add-to-cart [item]="item" [buttonText]="'Add item'" buttonClass="'my-custom-class'">
</add-to-cart>
```


<div class="how-to-use">With a html number input positioned on top</div>
```html
<add-to-cart [item]="item" [type]="'number'" [position]="'top'">
</add-to-cart>
```


<div class="how-to-use">With a select for selecting quantity</div>
```html
<add-to-cart [item]="item" [type]="'dropdown'" [dropdown]="[{ label: 'One item', value: 1 }, { label: 'Two items', value: 2 }]">
</add-to-cart>
```


<div class="how-to-use">With the default button and different quantity</div>
```html
<add-to-cart [item]="item" [quantity]="5">
</add-to-cart>
```



