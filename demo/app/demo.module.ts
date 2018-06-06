import {NgModule} from '@angular/core';

import {ShoppingCartModule} from '../../src/shopping-cart.module';
import {DemoComponent} from './demo.component';
import {DemoAddToCartComponent} from './demo-add-to-cart/demo-add-to-cart.component';
import {DemoCheckoutComponent} from './demo-cart-checkout/demo-cart-checkout.component';
import {DemoCartSummaryComponent} from './demo-cart-summary/demo-cart-summary.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DemoCartViewComponent} from './demo-cart-view/demo-cart-view.component';
import {DemoCartShowcaseComponent} from './demo-cart-showcase/demo-cart-showcase.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DemoShowcaseItemComponent} from './demo-showcase-item-component/demo-showcase-item.component';

@NgModule({
  declarations: [
    DemoComponent,
    DemoAddToCartComponent,
    DemoCheckoutComponent,
    DemoCartSummaryComponent,
    DemoCartViewComponent,
    DemoCartShowcaseComponent,
    DemoShowcaseItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ShoppingCartModule.forChild(),
    NgbModule,
  ],
  exports: [
    DemoComponent,
    DemoAddToCartComponent,
    DemoCheckoutComponent,
    DemoCartSummaryComponent,
    DemoCartViewComponent,
    DemoCartShowcaseComponent,
    DemoShowcaseItemComponent,
    CommonModule,
    FormsModule,
  ],
  entryComponents: [DemoShowcaseItemComponent]
})
export class DemoModule {
}
