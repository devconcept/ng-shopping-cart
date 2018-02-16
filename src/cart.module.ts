import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { CartCheckoutComponent } from './components/cart-checkout/cart-checkout.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { DefaultCartService } from './services/default-cart-service';
import { AddToCartEditorComponent } from './components/add-to-cart-editor/add-to-cart-editor.component';
import { CartService } from './services/cart-service';

@NgModule({
  declarations: [
    AddToCartEditorComponent,
    AddToCartComponent,
    CartCheckoutComponent,
    CartSummaryComponent,
  ],
  imports: [
    BrowserModule,
  ],
  exports: [
    AddToCartEditorComponent,
    AddToCartComponent,
    CartCheckoutComponent,
    CartSummaryComponent,
  ],
  providers: [{ provide: CartService, useClass: DefaultCartService }],
})
export class CartModule {
}
