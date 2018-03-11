import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCheckoutDemoComponent } from './cart-checkout-demo.component';
import { CartCheckoutComponent, CartService, MemoryCartService } from '../../../src';

describe('CartCheckoutDemoComponent', () => {
  let component: CartCheckoutDemoComponent;
  let fixture: ComponentFixture<CartCheckoutDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartCheckoutDemoComponent, CartCheckoutComponent ],
      providers: [
        { provide: CartService, useClass: MemoryCartService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCheckoutDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
