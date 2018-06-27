import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CartSummaryComponent} from './cart-summary.component';
import {CartService} from '../../services/cart.service';
import {BaseCartItem} from '../../classes/base-cart-item';
import {MemoryCartService} from '../../services/memory-cart.service';
import {By} from '@angular/platform-browser';
import {Component, DebugElement} from '@angular/core';

// region Test setup
const TEST_SUMMARY_TEMPLATE = `
  <cart-summary [icon]="icon" [totalPlurals]="totalPlurals" [localeFormat]="localeFormat"></cart-summary>
`;

@Component({
  selector: 'cart-test-summary',
  template: TEST_SUMMARY_TEMPLATE
})
class CartTestSummaryComponent {
  icon: string;
  totalPlurals: { [k: string]: string };
  localeFormat: string;
}

// endregion

describe('CartSummaryComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [CartSummaryComponent, CartTestSummaryComponent],
        providers: [
          {provide: CartService, useClass: MemoryCartService}
        ]
      })
      .compileComponents();
  }));

  describe('Default values', () => {
    let component: CartSummaryComponent;
    let fixture: ComponentFixture<CartSummaryComponent>;
    let totalCount: DebugElement;
    let totalCost: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(CartSummaryComponent);
      component = fixture.componentInstance;

      totalCount = fixture.debugElement.query(By.css('.cart-summary-items'));
      totalCost = fixture.debugElement.query(By.css('.cart-summary-cost'));
    });

    it('should contain default values for plurals', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
      const pluralKeys = Object.keys(component.summaryPlurals);
      expect(pluralKeys.length).toBeGreaterThanOrEqual(3);
      const emptyPlural = pluralKeys.find(k => k === '=0');
      expect(emptyPlural).toBeTruthy();
      const fallBackPlural = pluralKeys.filter(k => !k.startsWith('='));
      expect(fallBackPlural.length).toEqual(1);
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


  describe('Plural assignment', () => {
    let component: CartTestSummaryComponent;
    let fixture: ComponentFixture<CartTestSummaryComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(CartTestSummaryComponent);
      component = fixture.componentInstance;
    });

    it('should set the default plurals value if the binding is not set', () => {
      fixture.detectChanges();
      const summaryElement = fixture.debugElement.query(By.css('cart-summary'));
      expect(summaryElement).toBeTruthy();
      const instance = summaryElement.componentInstance;
      expect(instance.summaryPlurals).toBeTruthy();
      expect(instance.summaryPlurals).toEqual(instance._defaultPlurals);
    });

    it('should set the default plurals if a value is not provided', () => {
      component.totalPlurals = null;
      fixture.detectChanges();
      const summaryElement = fixture.debugElement.query(By.css('cart-summary'));
      expect(summaryElement).toBeTruthy();
      const instance = summaryElement.componentInstance;
      expect(instance.summaryPlurals).toBeTruthy();
      expect(instance.summaryPlurals).toEqual(instance._defaultPlurals);
    });

    it('should set update the plurals value to the provided value or the default', () => {
      const plurals = {'=0': 'Empty', 'other': '# items'};
      component.totalPlurals = plurals;
      fixture.detectChanges();
      const summaryElement = fixture.debugElement.query(By.css('cart-summary'));
      const instance = summaryElement.componentInstance;
      expect(instance.summaryPlurals).toBeTruthy();
      expect(instance.summaryPlurals).not.toEqual(instance._defaultPlurals);
      expect(instance.summaryPlurals).toEqual(plurals);
      component.totalPlurals = null;
      fixture.detectChanges();
      expect(instance.summaryPlurals).toEqual(instance._defaultPlurals);
      expect(instance.summaryPlurals).not.toEqual(plurals);
    });

    it('should not update the plurals when other bindings are set and the plurals are not modified', () => {
      const plurals = {'=0': 'Empty', 'other': '# items'};
      component.totalPlurals = plurals;
      fixture.detectChanges();
      const summaryElement = fixture.debugElement.query(By.css('cart-summary'));
      const instance = summaryElement.componentInstance;
      expect(instance.summaryPlurals).toBeTruthy();
      expect(instance.summaryPlurals).not.toEqual(instance._defaultPlurals);
      expect(instance.summaryPlurals).toEqual(plurals);
      component.icon = 'http://fakeurl.com';
      fixture.detectChanges();
      expect(instance.summaryPlurals).toEqual(plurals);
    });
  });

  describe('Locale format', () => {
    let component: CartTestSummaryComponent;
    let fixture: ComponentFixture<CartTestSummaryComponent>;
    let service: CartService<BaseCartItem>;
    let totalCost: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(CartTestSummaryComponent);
      component = fixture.componentInstance;
      service = TestBed.get(CartService);
      totalCost = fixture.debugElement.query(By.css('.cart-summary-cost'));
    });

    it('should use the service format by default', () => {
      service.addItem(new BaseCartItem({id: 1, name: 'Test item', quantity: 1, price: 10.49}));
      fixture.detectChanges();
      expect(totalCost.nativeElement.innerText).toBe('$10.49');
      service.setLocaleFormat('EUR');
      fixture.detectChanges();
      expect(totalCost.nativeElement.innerText).toBe('€10.49');
    });

    it('should allow to override the format at component level', () => {
      service.addItem(new BaseCartItem({id: 1, name: 'Test item', quantity: 1, price: 10.49}));
      service.setLocaleFormat('EUR');
      fixture.detectChanges();
      expect(totalCost.nativeElement.innerText).toBe('€10.49');
      component.localeFormat = '￥';
      fixture.detectChanges();
      expect(totalCost.nativeElement.innerText).toBe('￥10.49');
      service.addItem(new BaseCartItem({id: 2, name: 'Test item', quantity: 1, price: 1}));
      fixture.detectChanges();
      expect(totalCost.nativeElement.innerText).toBe('￥11.49');
    });
  });
});
