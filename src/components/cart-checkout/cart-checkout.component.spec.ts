import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCheckoutComponent } from './cart-checkout.component';
import { CartService, MemoryCartService } from '../../';

describe('CartCheckoutComponent', () => {
  let component: CartCheckoutComponent;
  let fixture: ComponentFixture<CartCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartCheckoutComponent ],
      providers: [
        { provide: CartService, useClass: MemoryCartService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
