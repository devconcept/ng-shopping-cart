import {TestBed, async} from '@angular/core/testing';
import {DemoComponent} from './demo.component';
import {DemoAddToCartComponent} from './demo-add-to-cart/demo-add-to-cart.component';
import {DemoCartSummaryComponent} from './demo-cart-summary/demo-cart-summary.component';
import {DemoCheckoutComponent} from './demo-cart-checkout/demo-cart-checkout.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ShoppingCartModule} from '../../src/shopping-cart.module';
import {CartService} from '../../src/classes/cart.service';
import {MemoryCartService} from '../../src/services/memory-cart.service';
import {DemoCartViewComponent} from './demo-cart-view/demo-cart-view.component';
import {DemoCartShowcaseComponent} from './demo-cart-showcase/demo-cart-showcase.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          DemoComponent,
          DemoAddToCartComponent,
          DemoCartSummaryComponent,
          DemoCheckoutComponent,
          DemoCartViewComponent,
          DemoCartShowcaseComponent,
        ],
        imports: [
          CommonModule,
          FormsModule,
          ShoppingCartModule,
          NgbModule,
        ],
        providers: [
          {provide: CartService, useClass: MemoryCartService}
        ]
      })
      .compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(DemoComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
