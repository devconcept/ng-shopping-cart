import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CartSummaryDemoComponent} from './demo-cart-summary.component';
import {CartService, CartSummaryComponent, MemoryCartService} from 'ng-shopping-cart';

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
