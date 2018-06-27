import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CartShowcaseItemComponent } from './cart-showcase-item.component';
import { BaseCartItem } from '../../classes/base-cart-item';
import {CartCurrencyPipe} from '../../pipes/cart-currency.pipe';

describe('DefaultShowcaseItemComponent', () => {
  let component: CartShowcaseItemComponent;
  let fixture: ComponentFixture<CartShowcaseItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartShowcaseItemComponent, CartCurrencyPipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartShowcaseItemComponent);
    component = fixture.componentInstance;
    component.item = new BaseCartItem();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
