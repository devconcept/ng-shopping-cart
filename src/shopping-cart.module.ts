import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { AddToCartEditorComponent } from './components/add-to-cart-editor/add-to-cart-editor.component';
import { CartCheckoutComponent } from './components/cart-checkout/cart-checkout.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { CartViewComponent } from './components/cart-view/cart-view.component';
import { CartService } from './services/cart.service';
import { CartShowcaseComponent } from './components/cart-showcase/cart-showcase.component';
import { ShowcaseOutletDirective } from './directives/showcase-outlet';
import { CartShowcaseItemComponent } from './components/cart-showcase-item/cart-showcase-item.component';
import { CartModuleOptions } from './interfaces/cart-module-options';
import { BaseCartItem } from './classes/base-cart-item';
import { MemoryCartService } from './services/memory-cart.service';
import { LocalStorageCartService } from './services/local-storage-cart.service';
import { SessionStorageCartService } from './services/session-storage-cart.service';
import { CartItem } from './classes/cart-item';
import { CART_ITEM_CLASS } from './services/item-class.token';
import { CART_SERVICE_CONFIGURATION } from './services/service-configuration.token';

function cartServiceFactory<T extends CartItem>(serviceType: string) {
  return function (itemClass: CartItem, configuration: any) {
    switch (serviceType) {
      case 'localStorage':
        return new LocalStorageCartService<T>(itemClass, configuration);
      case 'sessionStorage':
        return new SessionStorageCartService<T>(itemClass, configuration);
      default:
        return new MemoryCartService<T>();
    }
  };
}

@NgModule({
  declarations: [
    AddToCartEditorComponent,
    AddToCartComponent,
    CartCheckoutComponent,
    CartSummaryComponent,
    CartShowcaseComponent,
    CartViewComponent,
    ShowcaseOutletDirective,
    CartShowcaseItemComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    AddToCartEditorComponent,
    AddToCartComponent,
    CartCheckoutComponent,
    CartSummaryComponent,
    CartShowcaseComponent,
    CartViewComponent,
    CartShowcaseItemComponent,
    CommonModule,
    HttpClientModule
  ],
  entryComponents: [CartShowcaseItemComponent],
})
export class ShoppingCartModule {
  static forRoot(options: CartModuleOptions = {}): ModuleWithProviders {
    const serviceType = options.serviceType || 'localStorage';
    let serviceOptions = null;
    if (!options.serviceOptions && (serviceType === 'localStorage' || serviceType === 'sessionStorage')) {
      serviceOptions = { storageKey: 'NgShoppingCart', clearOnError: true };
    }
    return {
      ngModule: ShoppingCartModule,
      providers: [
        {
          provide: CART_ITEM_CLASS,
          useValue: options.itemType || BaseCartItem
        },
        {
          provide: CART_SERVICE_CONFIGURATION,
          useValue: serviceOptions
        },
        {
          provide: CartService,
          useFactory: cartServiceFactory(serviceType),
          deps: [CART_ITEM_CLASS, CART_SERVICE_CONFIGURATION]
        }
      ],
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: ShoppingCartModule
    };
  }
}




