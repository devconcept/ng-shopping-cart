import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DemoCheckoutComponent} from './demo-cart-checkout.component';
import {CartService} from '../../../src/services/cart.service';
import {MemoryCartService} from '../../../src/services/memory-cart.service';
import {HttpClientModule} from '@angular/common/http';
import {ShoppingCartModule} from '../../../src/shopping-cart.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

describe('DemoCheckoutComponent', () => {
  let component: DemoCheckoutComponent;
  let fixture: ComponentFixture<DemoCheckoutComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [DemoCheckoutComponent],
        imports: [
          HttpClientModule,
          ShoppingCartModule,
          FormsModule,
          NgbModule
        ],
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
