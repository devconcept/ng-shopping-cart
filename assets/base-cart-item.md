## BaseCartItem


<span class="badge badge-warning">Class</span>


Extends: <a href="api/classes/cart-item">`CartItem`</a>

A default implementation for CartItem



<blockquote class="doc note bg-light">You can access item information either with direct property access or method calls, eg. `item.id === item.getId()`</blockquote>




#### `id`

Type: `any`



The id of the item



#### `name`

Type: `string`



The name of the item



#### `price`

Type: `number`



The price of the item



#### `image`

Type: `string`



The url of an image for the item



#### `quantity`

Type: `number`



The ordered quantity of the item



#### `data`

Type: `any`



Any additional data you want to include in the item



#### `getId()`

Type: `any`



Abstract base method implementation to obtain the item id



#### `setId(id: any)`

Sets the current id for the item



#### `getName()`

Type: `string`



Abstract base method implementation to return the name, a small text describing the item



#### `setName(name: string)`

Sets the name of the item



#### `getPrice()`

Type: `number`



Abstract base method implementation to know how much the item cost



#### `setPrice(price: number)`

Set the price of the item



#### `getQuantity()`

Type: `number`



Abstract base method implementation to return how much of the item is ordered



#### `setQuantity(quantity: number)`

Abstract base method implementation to set how much of the item is ordered



#### `getImage()`

Type: `string`



Abstract base method implementation to get the url of an image for the item



#### `setImage(image: string)`

Sets the url of the item's image



#### `getData()`

Type: `any`



Gets any additional data added to the item



#### `setData(data: any)`

Sets any additional data to the item



### How to use

<div class="how-to-use">Using properties and methods</div>
```typescript
const item = new BaseCartItem({id: 1, name: 'Demo'});
item.quantity = 10;
item.setQuantity(50);
console.log(item.quantity) // prints 50
```


