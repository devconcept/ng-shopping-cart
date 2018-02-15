import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CartModule } from '../../src/cart.module';
import { AppComponent } from './app.component';
import { AddToCartDemoComponent } from './add-to-cart-demo/add-to-cart-demo.component';
import { CartCheckoutDemoComponent } from './cart-checkout-demo/cart-checkout-demo.component';
import { CartSummaryDemoComponent } from './cart-summary-demo/cart-summary-demo.component';


@NgModule({
  declarations: [
    AppComponent,
    AddToCartDemoComponent,
    CartCheckoutDemoComponent,
    CartSummaryDemoComponent,
  ],
  imports: [
    BrowserModule,
    CartModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
