import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DemoAppComponent} from './demo-app.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CartService} from '../../../src/classes/cart.service';
import {MemoryCartService} from '../../../src/services/memory-cart.service';
import {CartSummaryDemoComponent} from '../demo-cart-summary/demo-cart-summary.component';
import {DemoAddToCartComponent} from '../demo-add-to-cart/demo-add-to-cart.component';
import {DemoCheckoutComponent} from '../demo-cart-checkout/demo-cart-checkout.component';
import {CartViewDemoComponent} from '../demo-cart-view/cart-view-demo.component';
import {CartShowcaseDemoComponent} from '../demo-cart-showcase/demo-cart-showcase.component';
import {ShoppingCartModule} from '../../../src/shopping-cart.module';

describe('DemoAppComponent', () => {
  let component: DemoAppComponent;
  let fixture: ComponentFixture<DemoAppComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          DemoAppComponent,
          DemoAddToCartComponent,
          CartSummaryDemoComponent,
          DemoCheckoutComponent,
          CartViewDemoComponent,
          CartShowcaseDemoComponent,
        ],
        imports: [
          CommonModule,
          FormsModule,
          ShoppingCartModule,
        ],
        providers: [
          {provide: CartService, useClass: MemoryCartService}
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
