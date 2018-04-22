@next guide/styling
## The cart service

The cart service is used to store your user's shopping cart contents as well as to set taxes, shipping cost and provide information to most of the built-in components. You should use only one instance of the service for your whole app. Although you can ignore this warning later on, make sure not to use different `CartItem` types under the same browser `Storage` key. Angular allows you to inject different service instances in different branches of the injector tree but the selected key in the `Storage` is unique for the whole app and this can create conflicts when saving and reading items.

#### Default service

By default the browser `localStorage` is used to persist items between app restarts. To inject it into one of your components write this in the constructor

```typescript
constructor(private cartService: CartService<BaseCartItem>) {
}
```

This gives you access to the base `CartService` methods like `getItems`, `getItem`, `addItem`, etc. The service is intentionally generic to allow Typescript's static typing to play its role. 

```typescript
console.log(this.cartService.getItem(1).getPrice()) // <-- works
```

If you are using a custom item implementation just change the type so you have access to its methods.

```typescript
constructor(private cartService: CartService<CustomCartItem>) {
   console.log(this.cartService.getItem('1').uuid) // <-- works too
}
```

Each time you add or remove an item the contents of the service are persisted in `localStorage`. The service also holds items in memory to boost performance.

#### Other services

There are other built-in options for `CartService`, you can also use your own implementation but let's focus first on changing the service for one that comes with the library.

The easiest way to change the service is to use the `forRoot` static function of the module. Setting the `serviceType` property to `'sessionStorage'`, `'memory'`, etc, gives you a different service type. Each of the services might have different configuration options so there is a third property in this method, `serviceOptions`, that sets that configuration right away.

```typescript
@NgModule({
  ...
  imports: [
    ...
    ShoppingCartModule.forRoot({
      itemType: CustomCartItem, // <-- Defaults to BaseCartItem if not present
      serviceType: 'sessionStorage', // <-- Use a different service
      serviceOptions: { storageKey: 'MyAppCart', clearOnError: true }, // <-- Service configuration
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
```

Check each service documentation to learn how to configure them.

#### Custom cart service

So, you have in mind a different strategy for the service, right? First and foremost you have to implement your own class based on the *abstract and generic* `CartService` and make it `Injectable`

```typescript
@Injectable()
export class CustomCartService<T extends CartItem> extends CartService<T> {
}
```

Wait, what? If you are wondering what the `<T extends CartItem>` means, it helps restrict what type of classes your service handles, that is, only descendants from the `CartItem` class are allowed as types. The base `CartService` has this restriction too so if you were to write
 
```typescript
@Injectable()
export class CustomCartService<T> extends CartService<T> {
  // Wrong, types are incompatibles
  // Type 'T' does not satisfy the constraint 'CartItem'.
}
```

the Typescript compiler would complain about type incompatibilities and your app won't compile.

After you implemented all abstract methods you must provide it to the module. You have to write something like this

```typescript
@NgModule({
  ...
  imports: [
    ...
    ShoppingCartModule,
  ],
  providers: [
    {provide: CartService, useClass: CustomCartService} // <-- Add the service in the providers array
  ], 
  bootstrap: [AppComponent],
})
export class AppModule {
}
```

That wasn't so hard, right? The tricky part is when your service *needs configuration* or *when you have to recreate cart items from plain objects*. The `CART_SERVICE_CONFIGURATION` and the `CART_ITEM_CLASS` tokens can help you with that. 

An example can serve better to explain this complicated matter. This code:

```typescript
@NgModule({
  ...
  imports: [
    ...
    ShoppingCartModule.forRoot({
      itemType: CustomCartItem,
      serviceType: 'sessionStorage',
      serviceOptions: { storageKey: 'MyAppCart', clearOnError: true }
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
```

is equivalent to:

```typescript
import {CART_ITEM_CLASS, CART_SERVICE_CONFIGURATION, CartService, SessionStorageCartService} from 'ng-shopping-cart';

@NgModule({
  ...
  imports: [
    ...
    ShoppingCartModule,
  ],
  providers: [
    {provide: CART_ITEM_CLASS, useValue: CustomCartItem},
    {provide: CART_SERVICE_CONFIGURATION, useValue: { storageKey: 'MyAppCart', clearOnError: true }},
    {provide: CartService, useClass: SessionStorageCartService}
  ], 
  bootstrap: [AppComponent],
})
export class AppModule {
}
```

Then, writing your service's constructor


```typescript
@Injectable()
export class CustomCartService<T extends CartItem> extends CartService<T> {
  constructor(@Inject(CART_ITEM_CLASS) itemClass: any, @Inject(CART_SERVICE_CONFIGURATION) configuration: any) {
      super(); // <-- Mandatory in all derived classes
      console.log(itemClass) // <-- The type of your cart items
      console.log(configuration) // <-- Your service configuration
    }
}
```

If you are an Angular master you realize immediately that those tokens are optional in the sense that you can bypass them and implement the service however you want or use your own tokens and you are right; however I've always though that patterns are useful to developers to achieve common understanding. Using the provided tokens help you to communicate your intention so prefer them over your own solutions.

As a final note, if you are wondering why you need an `itemClass` token, when you deal with generics you must know that in Typescript generic type information disappears at run-time so the compiler won't let you write the following

```typescript
class GenericClass<T> {
  create(): T {
    return new T(); // <-- 'T' only refers to a type, but is being used as a value here.
  }
}
```

The only way to bypass such limitation to create new item instances from within the service is to have the class constructor stored somewhere and that is the exact function of the `CART_ITEM_CLASS` token. You can write

```typescript
  return new itemClass();
```

and since `itemClass` refers to a constructor function it creates a new instance of that class. The fact that this is an injectable token means that you can reuse or change it in different parts of your app.
