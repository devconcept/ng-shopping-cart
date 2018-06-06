import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DemoCartSummaryComponent} from './demo-cart-summary.component';
import {CartService} from '../../../src/classes/cart.service';
import {MemoryCartService} from '../../../src/services/memory-cart.service';
import {ShoppingCartModule} from '../../../src/shopping-cart.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

describe('CartSummaryDemoComponent', () => {
  let component: DemoCartSummaryComponent;
  let fixture: ComponentFixture<DemoCartSummaryComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          DemoCartSummaryComponent,
        ],
        imports: [
          ShoppingCartModule,
          NgbModule,
        ],
        providers: [
          {provide: CartService, useClass: MemoryCartService}
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoCartSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
