import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {CartViewComponent} from './cart-view.component';
import {CartService} from '../../services/cart.service';
import {MemoryCartService} from '../../services/memory-cart.service';
import {BaseCartItem} from '../../classes/base-cart-item';
import {toArray} from 'lodash';
import {CartCurrencyPipe} from '../../pipes/cart-currency.pipe';

// region Test setup
const TEST_CUSTOM_EMPTY_TEMPLATE = '<cart-view [customEmptyContent]="true"><div class="test"></div></cart-view>';

@Component({
  selector: 'cart-test-custom-cart-view',
  template: TEST_CUSTOM_EMPTY_TEMPLATE
})
class TestCustomEmptyComponent {

}

const TEST_CURRENCY_VIEW_TEMPLATE = '<cart-view [localeFormat]="localeFormat"></cart-view>';

@Component({
  selector: 'cart-test-currency-cart-view',
  template: TEST_CURRENCY_VIEW_TEMPLATE
})
class TestCurrencyCartViewComponent {
  localeFormat: string;
}

// endregion

describe('CartViewComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [CartViewComponent, TestCustomEmptyComponent, TestCurrencyCartViewComponent, CartCurrencyPipe],
        providers: [
          {provide: CartService, useClass: MemoryCartService}
        ]
      })
      .compileComponents();
  }));

  describe('Default component', () => {
    let component: CartViewComponent;
    let fixture: ComponentFixture<CartViewComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(CartViewComponent);
      component = fixture.componentInstance;
    });

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
    let component: CartViewComponent;
    let fixture: ComponentFixture<CartViewComponent>;
    let cartService: CartService<BaseCartItem>;

    beforeEach(() => {
      fixture = TestBed.createComponent(CartViewComponent);
      component = fixture.componentInstance;
      cartService = TestBed.get(CartService);
      cartService.addItem(new BaseCartItem({id: 1, name: 'Test item', price: 10, quantity: 1, image: 'http://my-image.com'}));
    });

    it('should display items when added to the service', () => {
      fixture.detectChanges();
      const emptyPanel = fixture.debugElement.query(By.css('.cart-view-empty'));
      expect(emptyPanel).toBeFalsy();
      const cartView = fixture.debugElement.query(By.css('.cart-view'));
      expect(cartView).toBeTruthy();
      expect(cartView.nativeElement.classList.contains('responsive-table-display')).toBeTruthy();
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
      const cartListFooters = fixture.debugElement
        .queryAll(By.css('.cart-list-footer .cart-list-summary :not(.cart-empty-summary)'));
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

  describe('Custom component', () => {
    let component: TestCustomEmptyComponent;
    let fixture: ComponentFixture<TestCustomEmptyComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestCustomEmptyComponent);
      component = fixture.componentInstance;
    });

    it('should render custom content', () => {
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.css('cart-view'));
      expect(comp).toBeTruthy();
      fixture.detectChanges();
      expect(comp.query(By.css('.test'))).toBeTruthy();
    });
  });

  describe('Locale format', () => {
    let component: TestCurrencyCartViewComponent;
    let fixture: ComponentFixture<TestCurrencyCartViewComponent>;
    let service: CartService<BaseCartItem>;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestCurrencyCartViewComponent);
      component = fixture.componentInstance;
      service = TestBed.get(CartService);
      service.setTaxRate(10);
      service.setShipping(10);
    });

    it('should use the service format by default', () => {
      service.addItem(new BaseCartItem({id: 1, name: 'Test item', quantity: 1, price: 10}));
      fixture.detectChanges();
      const componentFooters = fixture.debugElement
        .queryAll(By.css('.cart-list-footer .cart-list-summary :not(.cart-empty-summary)'));
      let footers = componentFooters.map(el => el.nativeElement.innerText);
      expect(footers[0]).toBe('Tax: (10%) $1.00');
      expect(footers[1]).toBe('Shipping: $10.00');
      expect(footers[2]).toBe('Total: $21.00');
      service.setLocaleFormat('€');
      fixture.detectChanges();
      footers = componentFooters.map(el => el.nativeElement.innerText);
      expect(footers[0]).toBe('Tax: (10%) €1.00');
      expect(footers[1]).toBe('Shipping: €10.00');
      expect(footers[2]).toBe('Total: €21.00');
    });

    it('should allow to override the format at component level', () => {
      service.addItem(new BaseCartItem({id: 1, name: 'Test item', quantity: 1, price: 10}));
      service.setLocaleFormat('€');
      fixture.detectChanges();
      const componentFooters = fixture.debugElement
        .queryAll(By.css('.cart-list-footer .cart-list-summary :not(.cart-empty-summary)'));
      let footers = componentFooters.map(el => el.nativeElement.innerText);
      expect(footers[0]).toBe('Tax: (10%) €1.00');
      expect(footers[1]).toBe('Shipping: €10.00');
      expect(footers[2]).toBe('Total: €21.00');
      component.localeFormat = '￥';
      fixture.detectChanges();
      footers = componentFooters.map(el => el.nativeElement.innerText);
      expect(footers[0]).toBe('Tax: (10%) ￥1.00');
      expect(footers[1]).toBe('Shipping: ￥10.00');
      expect(footers[2]).toBe('Total: ￥21.00');
      service.addItem(new BaseCartItem({id: 2, name: 'Test item', quantity: 1, price: 1}));
      fixture.detectChanges();
      footers = componentFooters.map(el => el.nativeElement.innerText);
      expect(footers[0]).toBe('Tax: (10%) ￥1.10');
      expect(footers[1]).toBe('Shipping: ￥10.00');
      expect(footers[2]).toBe('Total: ￥22.10');
    });
  });
});
