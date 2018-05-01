import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {CartViewComponent} from './cart-view.component';
import {CartService} from '../../classes/cart.service';
import {MemoryCartService} from '../../services/memory-cart.service';
import {BaseCartItem} from '../../classes/base-cart-item';
import {toArray} from 'lodash';


describe('CartViewComponent', () => {
  let component: CartViewComponent;
  let fixture: ComponentFixture<CartViewComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [CartViewComponent],
        providers: [
          {provide: CartService, useClass: MemoryCartService}
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartViewComponent);
    component = fixture.componentInstance;
  });

  describe('Default component', () => {
    it('should show empty and display the contents of the emptyText input', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
      expect(component.emptyText).toEqual('Your cart is empty');
      const emptyPanel = fixture.debugElement.query(By.css('.cart-view-empty'));
      expect(emptyPanel).toBeTruthy();
      expect(emptyPanel.nativeElement.innerText).toEqual(component.emptyText);
      const cartListHeaders = fixture.debugElement.query(By.css('.cart-list-header'));
      expect(cartListHeaders).toBeFalsy();
      const footerContainer = fixture.debugElement.query(By.css('.cart-list-footer'));
      expect(footerContainer).toBeFalsy();
    });
  });

  describe('Component with items', () => {
    let cartService: CartService<BaseCartItem>;

    beforeEach(() => {
      cartService = TestBed.get(CartService);
      cartService.addItem(new BaseCartItem({id: 1, name: 'Test item', price: 10, quantity: 1, image: 'http://my-image.com'}));
    });

    it('should display items when added to the service', () => {
      fixture.detectChanges();
      const emptyPanel = fixture.debugElement.query(By.css('.cart-view-empty'));
      expect(emptyPanel).toBeFalsy();
      const cartView = fixture.debugElement.query(By.css('.cart-view'));
      expect(cartView).toBeTruthy();
      expect(cartView.nativeElement.classList.contains('fixed')).toBeTruthy();
      const cartListView = fixture.debugElement.query(By.css('.cart-list-view'));
      expect(cartListView).toBeTruthy();
      expect(cartListView.nativeElement.classList.contains('no-images')).toBeFalsy();
      cartService.addItem(new BaseCartItem({id: 2, name: 'Test item 2', price: 10, quantity: 1}));
      expect(component.cost).toEqual(20);
    });

    it('should display header texts when there are items in the cart', () => {
      fixture.detectChanges();
      const cartListHeaders = fixture.debugElement.query(By.css('.cart-list-header'));
      expect(cartListHeaders).toBeTruthy();
      const headers = toArray(cartListHeaders.nativeElement.children).map(h => h.innerText);
      expect(headers.length).toEqual(5);
      expect(headers[0]).toEqual('');
      expect(headers[1]).toEqual(component.nameHeaderText);
      expect(headers[2]).toEqual(component.quantityHeaderText);
      expect(headers[3]).toEqual(component.priceHeaderText);
      expect(headers[4]).toEqual(component.totalHeaderText);
    });

    it('should allow to change header texts', () => {
      component.nameHeaderText = 'Test name';
      component.quantityHeaderText = 'Test quantity';
      component.priceHeaderText = 'Test price';
      component.totalHeaderText = 'Test total';
      fixture.detectChanges();
      const cartListHeaders = fixture.debugElement.query(By.css('.cart-list-header'));
      expect(cartListHeaders).toBeTruthy();
      const headers = toArray(cartListHeaders.nativeElement.children).map(h => h.innerText);
      expect(headers.length).toEqual(5);
      expect(headers[0]).toEqual('');
      expect(headers[1]).toEqual('Test name');
      expect(headers[2]).toEqual('Test quantity');
      expect(headers[3]).toEqual('Test price');
      expect(headers[4]).toEqual('Test total');
    });

    it('should display footer texts when there are items in the cart', () => {
      cartService.setTaxRate(10);
      cartService.setShipping(20);
      fixture.detectChanges();
      const footerContainer = fixture.debugElement.query(By.css('.cart-list-footer'));
      expect(footerContainer).toBeTruthy();
      const cartListFooters = fixture.debugElement.queryAll(By.css('.cart-list-footer .cart-list-summary :not(.cart-empty-summary)'));
      expect(cartListFooters).toBeTruthy();
      const footers = cartListFooters
        .map(f => f.nativeElement.innerText);
      expect(footers.length).toEqual(3);
      expect(footers[0]).toEqual(component.taxFooterText + ': (10%) $1.00');
      expect(footers[1]).toEqual(component.shippingFooterText + ': $20.00');
      expect(footers[2]).toEqual(component.totalFooterText + ': $31.00');
    });

    it('should allow to change footer texts', () => {
      component.taxFooterText = 'Test tax';
      component.shippingFooterText = 'Test shipping';
      component.totalFooterText = 'Test total';
      fixture.detectChanges();
      const footerContainer = fixture.debugElement.query(By.css('.cart-list-footer'));
      expect(footerContainer).toBeTruthy();
      const cartListFooters = fixture.debugElement.queryAll(By.css('.cart-list-footer .cart-list-summary :not(.cart-empty-summary)'));
      expect(cartListFooters).toBeTruthy();
      const footers = cartListFooters
        .map(f => f.nativeElement.innerText);
      expect(footers.length).toEqual(3);
      expect(footers[0]).toMatch(new RegExp('^' + component.taxFooterText));
      expect(footers[1]).toMatch(new RegExp('^' + component.shippingFooterText));
      expect(footers[2]).toMatch(new RegExp('^' + component.totalFooterText));
    });

    it('should increase and decrease item quantities', () => {
      fixture.detectChanges();
      const item = cartService.getItem(1);
      component.increase(item);
      expect(item.getQuantity()).toEqual(2);
      component.decrease(item);
      expect(item.getQuantity()).toEqual(1);
      component.decrease(item);
      expect(cartService.getItem(1)).toBeUndefined();
    });
  });
});
