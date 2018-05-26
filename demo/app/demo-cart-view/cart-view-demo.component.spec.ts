import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CartViewDemoComponent} from './cart-view-demo.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CartViewComponent} from '../../../src/components/cart-view/cart-view.component';
import {CartService} from '../../../src/classes/cart.service';
import {MemoryCartService} from '../../../src/services/memory-cart.service';

describe('CartViewDemoComponent', () => {
  let component: CartViewDemoComponent;
  let fixture: ComponentFixture<CartViewDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartViewDemoComponent, CartViewComponent],
      imports: [
        CommonModule,
        FormsModule,
      ],
      providers: [
        {provide: CartService, useClass: MemoryCartService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartViewDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
