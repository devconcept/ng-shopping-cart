@next guide/the-cart-service
@order 2
## The cart item

Cart items are the building blocks of a cart. They are what the customers choose when they wish to purchase anything. Each item is unique but can be ordered more than once so if you want 3 items of a particular product what you have is one item with `quantity=3`.

> You can't have multiple items with the same `id` in your cart. Adding another will overwrite the previous item with that particular `id`. 

#### The `CartItem` class

The `CartItem` class is an *abstract class* with 6 *abstract methods* that you must implement if you want to use your own data structure. This methods are the minimum required for the library to interact with the items. Those methods and their return values are:

- `getId():any`: An unique identifier for each item.
- `getName(): string`: Short descriptive text for the item.
- `getPrice(): number`: How much a single unit cost.
- `getImage(): string`: An optional url with an image of your item.
- `getQuantity(): number`: How much of this item is ordered.
- `setQuantity(quantity: number): void`: Sets how much of this item is ordered.

Ids are compared using strict equality so make sure you use the same data type for all of them and use only primitive values. 

> Using objects as ids might have undesirable side effects.

#### Default `CartItem`

The built-in implementation of the `CartItem` class is `BaseCartItem` which uses the following properties to store data

- `id: any`
- `name: string`
- `price: number`
- `image: string`
- `quantity: number`
- `data: any`

The last property `data` is an object that can be used to store any additional metadata about the item allowing this class to fit most use cases. The constructor takes a single object as parameter and use those properties to create a new instance.

```typescript
// New item with default values
const item = new BaseCartItem();

// New item with some values set
const item = new BaseCartItem({id: 1, name: 'My item'});
```

You also have setters and getters for all properties and the base method `total` that returns the total cost of the item (`total = price * quantity`).

```typescript
const item = new BaseCartItem();
item.setId(1);
item.setName('Test item');
item.setPrice(10);
item.setQuantity(10);

console.log(item.total()); // Prints 100
```

Using `id`, `name`, and the all other properties directly is equivalent to use setters and getters. They exist only for convenience. 

> Do not change the id of the item after you added to the cart service collection. The service only tracks each individual item when they are added to the cart.

#### Using other classes

The `BaseCartItem` is great but forces your app to have a predefined data structure. What if you designed your app with the word `'cost'` as the indication of price? What if you use a lot of other properties to store data about your items and don't want to be forced to fit all of them in a `item.data.['...']` property? The solution is simple, just create a new class and extend the abstract `CartItem`. Thanks to the power of Typescript generics you can use your class in the service as well, preserving all the benefits of static typing.

```typescript
import { CartItem } from 'ng-shopping-cart';

export class CustomCartItem extends CartItem {
  public uuid: string;
  public description: string;
  public cost: number;
  // ... add your own properties and methods
  
  public getId(): any { // <-- implement all abstract methods to interop with the library
    return this.uuid;
  } 
  // ... also add getName, getPrice, getImage, getQuantity and setQuantity 
}
```

The next step is to set your custom type in the module's `forRoot` static method in your root app's module.

```typescript
@NgModule({
  ...
  imports: [
    ShoppingCartModule.forRoot({
      itemType: CustomCartItem, // <-- Set the new class reference to your items here
    })
    ...
  ],   
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Always set a reference to the class itself. The service stores that reference and uses it to create new instances when they are needed.

#### Persisting items

You might be wondering why the constructor takes one argument, an object, as single parameter instead of writing something like this:

```typescript
const item = new BaseCartItem(1, 'Test item', ...);
```

The answer is **persistence**. When objects are stored in a browser storage source like `localStorage`, it stores everything as plain objects; the reference to the original constructor function is lost and so are the methods that ships with the prototype. The same happens when you retrieve the cart contents from a remote server. When the items are restored in a page reload or in the app bootstrap is hard to figure out how to reconstruct back the items to make them act as class instances rather than plain objects. The simplest solution is to create a convention. Passing a single object in the constructor avoids dealing with different implementations where the `CartItem` have different parameters and it gives the library a predictable way to create new class instances from those deserialized objects.

```typescript
import { CartItem } from 'ng-shopping-cart';

export class CustomCartItem extends CartItem {
  constructor(itemData: any) {
    this.uuid = itemData.uuid;
    ...
  }

  // add your own properties and methods
  // implement all abstract methods to interop with the library
}
```

The shape of the `itemData` object is the same that you get when you execute:
 
```typescript
console.log(JSON.parse(JSON.stringify(item)));
```

If you previously called `console.log(item)` it shows the word `CustomCartItem`. The class prototype is there and all the methods are present. After you parsed the result all functions were lost and the items is recognized as a plain object. The `itemData` parameter contains all deep properties that contained primitive values. You must use those values to reconstruct the item.  

Oh, you still want to use your `CartItem` constructor in a different way? Don't worry we have you covered. In that case, you must add a static `fromJSON` method to your class. It takes one object as parameter. The `CartService` will first check if this method is present and use it to instantiate the objects. Only if this method is missing the service will use the constructor to create items. Of course this method must return a new class instance or otherwise it will be completely useless.

```typescript
import { CartItem } from 'ng-shopping-cart';

export class CustomCartItem extends CartItem {
  constructor(public uuid: string, ...) {
    
  }
  
  static fromJSON(itemData: any) {
    return new CustomCartItem(itemData.uuid, ...)
  }

  // add your own properties and methods
  // implement all abstract methods to interop with the library
}
```
