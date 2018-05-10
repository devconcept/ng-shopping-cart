import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ShoppingCartModule} from '../../src';
import { AppComponent } from './app.component';
import { DemoAddToCartComponent } from './demo-add-to-cart/demo-add-to-cart.component';
import { DemoCheckoutComponent } from './demo-cart-checkout/demo-cart-checkout.component';
import { CartSummaryDemoComponent } from './demo-cart-summary/demo-cart-summary.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartViewDemoComponent } from './demo-cart-view/cart-view-demo.component';
import { CartShowcaseDemoComponent } from './demo-cart-showcase/demo-cart-showcase.component';
import { DemoCartItem } from './demo-cart-item';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DemoShowcaseItemComponent } from './demo-showcase-item-component/demo-showcase-item.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoAddToCartComponent,
    DemoCheckoutComponent,
    CartSummaryDemoComponent,
    CartViewDemoComponent,
    CartShowcaseDemoComponent,
    DemoShowcaseItemComponent,
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
    NgbModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  entryComponents: [DemoShowcaseItemComponent]
})
export class AppModule {
}
