## CartItem


<span class="badge badge-warning">Abstract class</span>



The base class for every unit of information stored in the cart service



#### `getId()`

Type: `any`



Returns an unique identifier for your item



#### `getName()`

Type: `string`



Returns the name, a small text describing the item



#### `getPrice()`

Type: `number`



Return how much a single unit of the item costs



#### `setQuantity(quantity: number)`

Sets how much of this item is ordered



#### `getQuantity()`

Type: `number`



Returns how much of this item is ordered



#### `getImage()`

Type: `string`



Returns the url of an image for the item



#### `total()`

Type: ``



Return the total cost of the item, that is the price multiplied by the quantity



