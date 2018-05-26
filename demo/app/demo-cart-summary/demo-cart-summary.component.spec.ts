import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CartSummaryDemoComponent} from './demo-cart-summary.component';
import {CartService} from '../../../src/classes/cart.service';
import {CartSummaryComponent} from '../../../src/components/cart-summary/cart-summary.component';
import {MemoryCartService} from '../../../src/services/memory-cart.service';

describe('CartSummaryDemoComponent', () => {
  let component: CartSummaryDemoComponent;
  let fixture: ComponentFixture<CartSummaryDemoComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          CartSummaryDemoComponent,
          CartSummaryComponent
        ],
        providers: [
          {provide: CartService, useClass: MemoryCartService}
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartSummaryDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
