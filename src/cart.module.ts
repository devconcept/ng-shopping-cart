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
import { DefaultCartItem } from './classes/default-cart-item';
import { MemoryCartService } from './services/memory-cart.service';
import { LocalStorageCartService } from './services/local-storage-cart.service';
import { SessionStorageCartService } from './services/session-storage-cart.service';
import { CartItem } from './classes/cart-item';
import { CartServiceFactoryOptions } from './interfaces/cart-service-factory-options';
import { ITEM_CLASS } from './services/item-class.token';

function cartServiceFactory<T extends CartItem>(options: CartServiceFactoryOptions) {
  return function(itemClass: CartItem)  {
    switch (options.serviceType) {
      case 'localStorage':
        return new LocalStorageCartService<T>(itemClass, options.serviceOptions);
      case 'sessionStorage':
        return new SessionStorageCartService<T>(itemClass, options.serviceOptions);
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
    CartShowcaseItemComponent
  ],
  entryComponents: [CartShowcaseItemComponent],
})
export class CartModule {
  static forRoot(options: CartModuleOptions = {}): ModuleWithProviders {
    const serviceType = options.serviceType || 'localStorage';
    let serviceOptions = null;
    if (!options.serviceOptions && (serviceType === 'localStorage' || serviceType === 'sessionStorage')) {
      serviceOptions = { storageKey: 'NgShoppingCart' };
    }
    return {
      ngModule: CartModule,
      providers: [
        {
          provide: ITEM_CLASS,
          useValue: options.itemType || DefaultCartItem
        },
        {
          provide: CartService,
          useFactory: cartServiceFactory({ serviceType, serviceOptions }),
          deps: [ITEM_CLASS]
        }
      ],
    };
  }
}




