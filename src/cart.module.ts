import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { AddToCartEditorComponent } from './components/add-to-cart-editor/add-to-cart-editor.component';
import { CartCheckoutComponent } from './components/cart-checkout/cart-checkout.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { CartViewComponent } from './components/cart-view/cart-view.component';
import { CartService } from './services/cart.service';
import { CartShowcaseComponent } from './components/cart-showcase/cart-showcase.component';
import {ShowcaseOutletDirective} from './directives/showcase-outlet';
import { CartShowcaseItemComponent } from './components/cart-showcase-item/cart-showcase-item.component';
import { LocalStorageCartService } from './services/local-storage-cart.service';
import { DefaultCartItem } from './classes/default-cart-item';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

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
    BrowserModule,
    HttpModule,
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
  providers: [{ provide: CartService, useFactory: () => new LocalStorageCartService<DefaultCartItem>(DefaultCartItem) }],
  entryComponents: [CartShowcaseItemComponent],
})
export class CartModule {
}
