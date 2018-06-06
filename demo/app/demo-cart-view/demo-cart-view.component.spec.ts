import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DemoCartViewComponent} from './demo-cart-view.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CartService} from '../../../src/services/cart.service';
import {MemoryCartService} from '../../../src/services/memory-cart.service';
import {ShoppingCartModule} from '../../../src/shopping-cart.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

describe('CartViewDemoComponent', () => {
  let component: DemoCartViewComponent;
  let fixture: ComponentFixture<DemoCartViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DemoCartViewComponent],
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

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoCartViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
