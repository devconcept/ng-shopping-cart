import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {AddToCartComponent} from './components/add-to-cart/add-to-cart.component';
import {AddToCartEditorComponent} from './components/add-to-cart-editor/add-to-cart-editor.component';
import {CartCheckoutComponent} from './components/cart-checkout/cart-checkout.component';
import {CartSummaryComponent} from './components/cart-summary/cart-summary.component';
import {CartViewComponent} from './components/cart-view/cart-view.component';
import {CartService} from './classes/cart.service';
import {CartShowcaseComponent} from './components/cart-showcase/cart-showcase.component';
import {ShowcaseOutletDirective} from './directives/showcase-outlet';
import {CartShowcaseItemComponent} from './components/cart-showcase-item/cart-showcase-item.component';
import {CartModuleOptions} from './interfaces/cart-module-options';
import {CART_ITEM_CLASS} from './services/item-class.token';
import {CART_SERVICE_CONFIGURATION} from './services/service-configuration.token';
import {CART_SERVICE_TYPE} from './services/service-type.token';
import {serviceFactory, setItemClass, setServiceConfiguration, setupService} from './service.factory';

/**
 * The main exported library module. It includes `forRoot` and `forChild` static methods to support angular feature modules and singleton
 * services.
 *
 * @note {warning} Only the `forRoot` method will configure providers for you. If you use the module without it you must configure the
 * library providers yourself.
 */
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
    return {
      ngModule: ShoppingCartModule,
      providers: [
        setItemClass(options.itemType),
        setupService(options.serviceType),
        setServiceConfiguration(options.serviceType, options.serviceOptions),
        {
          provide: CartService,
          useFactory: serviceFactory,
          deps: [CART_SERVICE_TYPE, CART_ITEM_CLASS, CART_SERVICE_CONFIGURATION]
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




