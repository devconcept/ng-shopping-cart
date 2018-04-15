@nochapter
@next guide/the-cart-item
## Installing

Using `npm`

```bash
npm install ng-shopping-cart --save
```

or `yarn`

```bash
yarn add ng-shopping-cart
```

## Configuring

Add the `ShoppingCartModule` module to your app

```typescript
import {ShoppingCartModule} from 'ng-shopping-cart'; // <-- Import the module class

@NgModule({
  declarations: [AppComponent, ...],
  imports: [
    ShoppingCartModule.forRoot({ // <-- Add the cart module to your root module
      itemType: MyCartItemClass, // <-- Configuration is optional
      serviceType: 'localStorage',
      serviceOptions: {
        storageKey: 'NgShoppingCart',
        clearOnError: true
      }
    }), 
    ...
  ],   
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Other modules just need to import the `NgShoppingCartModule`

```typescript
import {ShoppingCartModule} from 'ng-shopping-cart';

@NgModule({
  declarations: [FeatureComponent, ...],
  imports: [
    ShoppingCartModule
    ...
  ],   
})
export class FeatureModule {
}
```

or use the static `forChild` function

```typescript
import {ShoppingCartModule} from 'ng-shopping-cart';

@NgModule({
  declarations: [FeatureComponent, ...],
  imports: [
    ShoppingCartModule.forChild()
    ...
  ],   
})
export class FeatureModule {
}
```

By default the the module persist `CartItem` instances using the class `BaseCartItem` in the browser localStorage under the key `'NgShoppingCart'`. 

The `forRoot` static method makes this initial configuration easy. It has 3 options, all of them with default values:

- `itemType` (default: `BaseCartItem`): to set your own `CartItem` class descendant as the service data structure.
- `serviceType` (default: `'localStorage'`): to set where will the service persist the data ('localStorage', 'sessionStorage', 'memory', etc).
- `serviceOptions` (default: depends of service): to set any additional service configuration in case it is supported or required.

You can also change the service and use your own implementation. To learn how to do it check ["The cart service"](/guide/the-cart-service)
