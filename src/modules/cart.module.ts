import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AddToCartComponent } from '../components/add-to-cart/add-to-cart.component';
import { CartCheckoutComponent } from '../components/cart-checkout/cart-checkout.component';
import { CartSummaryComponent } from '../components/cart-summary/cart-summary.component';


@NgModule({
  declarations: [
    AddToCartComponent,
    CartCheckoutComponent,
    CartSummaryComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
})
export class AppModule { }
