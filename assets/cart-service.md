## CartService&lt;T extends CartItem&gt;

<span class="badge badge-primary">Generic</span>
<span class="badge badge-warning">Abstract class</span>



The base class for storing items in your cart



<blockquote class="doc note bg-light">Do not modify the items id after its added to the cart. Doing so could end up with duplicates which can cause
undefined behaviour</blockquote>




#### `onItemAdded`

Type: `EventEmitter<T>`



Emits an event every time an item is added to the cart



#### `onItemRemoved`

Type: `EventEmitter<T>`



Emits an event every time an item is removed from the cart



#### `onItemsChanged`

Type: `EventEmitter<number>`



Emits an event every time an item is added or removed from the cart



#### `getItem(id: any)`

Type: `T`



Finds an item by id



#### `getItems()`

Type: `T[]`



Gets all the items in the cart



#### `addItem(item: T)`

Add a new item to the cart



#### `removeItem(id: any)`

Remove an item from the cart by id



#### `itemCount()`

Type: `number`



Returns the number of unique items in the cart



#### `entries()`

Type: `number`



Returns the number of item including each item's quantity



#### `cost()`

Type: `number`



Returns the total cost of the shopping cart without including shipping and taxes



#### `clear()`

Removes all items from the cart



#### `isEmpty()`

Type: `boolean`



Returns if the carts has any items in it



#### `getShipping()`

Type: `number`



Returns the shipping cost of the shopping cart



#### `setShipping(shipping: number)`

Sets the shipping cost of the shopping cart



#### `getTaxRate()`

Type: `number`



Returns the tax rate of the shopping cart



#### `setTaxRate(tax: number)`

Sets the tax rate of the shopping cart



#### `getTax()`

Type: `number`



Returns the tax computation of the shopping cart



#### `totalCost()`

Type: `number`



Returns the total cost of the shopping cart including shipping and taxes



#### `toObject()`

Type: ``



Returns an object with all the cart information in it
Useful for serialization of the cart



