import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CartSummaryComponent} from './cart-summary.component';
import {CartService} from '../../services/cart.service';
import {BaseCartItem} from '../../classes/base-cart-item';
import {MemoryCartService} from '../../services/memory-cart.service';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

describe('CartSummaryComponent', () => {
  let component: CartSummaryComponent;
  let fixture: ComponentFixture<CartSummaryComponent>;
  let totalCount: DebugElement;
  let totalCost: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [CartSummaryComponent],
        providers: [
          {provide: CartService, useClass: MemoryCartService}
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartSummaryComponent);
    component = fixture.componentInstance;

    totalCount = fixture.debugElement.query(By.css('.cart-summary-items'));
    totalCost = fixture.debugElement.query(By.css('.cart-summary-cost'));
  });

  it('should be created with an svg icon an a total amount of 0', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.totalItems).toEqual(0);
    expect(component.totalCost).toEqual(0);
    const icon = fixture.debugElement.query(By.css('svg'));
    expect(icon).toBeTruthy();
    expect(totalCount.nativeElement.innerText).toEqual('No items');
    expect(totalCost.nativeElement.innerText).toMatch(/0\.00$/);
  });

  it('should change the total cost and item count when items are added to the service', () => {
    const cartService = TestBed.get(CartService);
    cartService.addItem(new BaseCartItem({id: 1, name: 'Test item', quantity: 5, price: 10}));
    fixture.detectChanges();
    expect(component.totalItems).toEqual(1);
    expect(component.totalCost).toEqual(50);
    expect(totalCount.nativeElement.innerText).toEqual('One item');
    expect(totalCost.nativeElement.innerText).toMatch(/50\.00$/);
    cartService.addItem(new BaseCartItem({id: 2, name: 'Test item 2', quantity: 1, price: 10}));
    fixture.detectChanges();
    expect(component.totalItems).toEqual(2);
    expect(component.totalCost).toEqual(60);
  });

  it('should allow to change the icon', () => {
    component.icon = 'http://www.myicon.com';
    fixture.detectChanges();
    const svg = fixture.debugElement.query(By.css('svg'));
    expect(svg).toBeFalsy();
    const icon = fixture.debugElement.query(By.css('img'));
    expect(icon).toBeTruthy();
    expect(icon.nativeElement.className).toEqual('summary-icon');
  });
});
