import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ShoppingCartModule} from '../../src';
import { AppComponent } from './app.component';
import { AddToCartDemoComponent } from './add-to-cart-demo/add-to-cart-demo.component';
import { CartCheckoutDemoComponent } from './cart-checkout-demo/cart-checkout-demo.component';
import { CartSummaryDemoComponent } from './cart-summary-demo/cart-summary-demo.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartViewDemoComponent } from './cart-view-demo/cart-view-demo.component';
import { CartShowcaseDemoComponent } from './cart-showcase-demo/cart-showcase-demo.component';
import { DemoCartItem } from './demo-cart-item';

@NgModule({
  declarations: [
    AppComponent,
    AddToCartDemoComponent,
    CartCheckoutDemoComponent,
    CartSummaryDemoComponent,
    CartViewDemoComponent,
    CartShowcaseDemoComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ShoppingCartModule.forRoot({
      itemType: DemoCartItem,
      serviceType: 'sessionStorage',
      serviceOptions: { storageKey: 'NgCartDemo', clearOnError: true },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
