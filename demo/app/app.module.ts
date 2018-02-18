import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CartModule } from '../../src';
import { AppComponent } from './app.component';
import { AddToCartDemoComponent } from './add-to-cart-demo/add-to-cart-demo.component';
import { CartCheckoutDemoComponent } from './cart-checkout-demo/cart-checkout-demo.component';
import { CartSummaryDemoComponent } from './cart-summary-demo/cart-summary-demo.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AddToCartDemoComponent,
    CartCheckoutDemoComponent,
    CartSummaryDemoComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    CartModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
