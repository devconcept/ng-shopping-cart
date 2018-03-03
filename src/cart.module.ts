import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { AddToCartEditorComponent } from './components/add-to-cart-editor/add-to-cart-editor.component';
import { CartCheckoutComponent } from './components/cart-checkout/cart-checkout.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { CartGridLayoutComponent } from './components/cart-grid-layout/cart-grid-layout.component';
import { CartViewComponent } from './components/cart-view/cart-view.component';
import { MemoryCartService } from './services/memory-cart.service';
import { CartService } from './services/cart.service';
import { CartShowcaseComponent } from './components/cart-showcase/cart-showcase.component';

@NgModule({
  declarations: [
    AddToCartEditorComponent,
    AddToCartComponent,
    CartCheckoutComponent,
    CartSummaryComponent,
    CartGridLayoutComponent,
    CartShowcaseComponent,
    CartViewComponent,
  ],
  imports: [
    BrowserModule,
  ],
  exports: [
    AddToCartEditorComponent,
    AddToCartComponent,
    CartCheckoutComponent,
    CartSummaryComponent,
    CartGridLayoutComponent,
    CartShowcaseComponent,
    CartViewComponent,
  ],
  providers: [{ provide: CartService, useClass: MemoryCartService }],
})
export class CartModule {
}
