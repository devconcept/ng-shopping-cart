import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DemoCheckoutComponent} from './demo-cart-checkout.component';
import {CartCheckoutComponent} from '../../../src/components/cart-checkout/cart-checkout.component';
import {CartService} from '../../../src/classes/cart.service';
import {MemoryCartService} from '../../../src/services/memory-cart.service';
import {HttpClientModule} from '@angular/common/http';

describe('DemoCheckoutComponent', () => {
  let component: DemoCheckoutComponent;
  let fixture: ComponentFixture<DemoCheckoutComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [DemoCheckoutComponent, CartCheckoutComponent],
        imports: [HttpClientModule],
        providers: [
          {provide: CartService, useClass: MemoryCartService}
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
