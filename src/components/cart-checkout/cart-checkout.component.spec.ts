import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {CartCheckoutComponent} from './cart-checkout.component';
import {BaseCartItem, CartService, CheckoutHttpSettings, MemoryCartService} from '../../';
import {HttpClient, HttpClientModule, HttpEvent, HttpResponse} from '@angular/common/http';
import {By} from '@angular/platform-browser';
import {Component} from '@angular/core';
import {CheckoutSettings, CheckoutType} from '../../types';
import {Observable} from 'rxjs/Observable';

describe('CartCheckoutComponent', () => {
  let subscriptions = [];

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [CartCheckoutComponent, TestCustomButtonComponent, TestServiceComponent],
        imports: [HttpClientModule],
        providers: [
          {provide: CartService, useClass: MemoryCartService},
        ]
      })
      .compileComponents();
  }));

  describe('Default component', () => {
    let component: CartCheckoutComponent;
    let fixture: ComponentFixture<CartCheckoutComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(CartCheckoutComponent);
      component = fixture.componentInstance;
    });

    it('should create with default values', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
      const button = fixture.debugElement.query(By.css('button'));
      expect(button).toBeTruthy();
      const buttonEl = button.nativeElement;
      expect(buttonEl.classList.contains('cart-checkout-button')).toEqual(true);
      expect(buttonEl.innerText).toEqual('Checkout');
    });

    it('should change the button text', () => {
      component.buttonText = 'Test add';
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.innerHTML.trim()).toEqual('Test add');
      expect(fixture.nativeElement.innerText).toEqual('Test add');
    });

    it('should change the button class', () => {
      component.buttonClass = 'test';
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.className).toEqual('test');
    });
  });

  describe('Custom component', () => {
    let component: TestCustomButtonComponent;
    let fixture: ComponentFixture<TestCustomButtonComponent>;
    let service: CartService<BaseCartItem>;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestCustomButtonComponent);
      component = fixture.componentInstance;
      service = TestBed.get(CartService);
      service.clear();
    });

    it('should render custom content', () => {
      fixture.detectChanges();
      const container = fixture.debugElement.query(By.css('span'));
      expect(container).toBeTruthy();
      expect(container.nativeElement.classList.contains('checkout-disabled')).toEqual(true);
      expect(container.query(By.css('.test'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('.test'))).toBeTruthy();
      component.custom = false;
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.test'))).toBeFalsy();
    });

    it('should remove the disabled class when there are items in the cart', () => {
      fixture.detectChanges();
      const container = fixture.debugElement.query(By.css('span'));
      expect(container.nativeElement.classList.contains('checkout-disabled')).toEqual(true);
      service.addItem(new BaseCartItem({id: 1, name: 'Test item', quantity: 1, price: 1}));
      fixture.detectChanges();
      expect(container.nativeElement.classList.contains('checkout-disabled')).toEqual(false);
    });

    it('should invoke the checkout when the projected content is clicked', () => {
      service.addItem(new BaseCartItem({id: 1, name: 'Test item', quantity: 1, price: 1}));
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.css('cart-checkout'));
      expect(comp.componentInstance instanceof CartCheckoutComponent).toEqual(true);
      const spy = spyOn(comp.componentInstance, 'doCheckout').and.callThrough();
      const checkoutSpy = jasmine.createSpy('checkout');
      const consoleSpy = spyOn(console, 'log');
      subscriptions.push(comp.componentInstance.checkout.subscribe(checkoutSpy));
      const content = fixture.debugElement.query(By.css('.test'));
      content.nativeElement.click();
      expect(spy).toHaveBeenCalled();
      expect(checkoutSpy).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalled();
    });
  });

  describe('Http service', () => {
    let component: TestServiceComponent;
    let fixture: ComponentFixture<TestServiceComponent>;
    let service: CartService<BaseCartItem>;
    let httpClient: HttpClient;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestServiceComponent);
      component = fixture.componentInstance;
      service = TestBed.get(CartService);
      service.clear();
      httpClient = TestBed.get(HttpClient);
    });

    it('should throw an error of there is no configuration', fakeAsync(() => {
      service.addItem(new BaseCartItem({id: 1, name: 'Test item', quantity: 1, price: 1}));
      component.service = 'http';
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.css('cart-checkout'));
      expect(comp.componentInstance instanceof CartCheckoutComponent).toEqual(true);
      const compInstance: CartCheckoutComponent = comp.componentInstance;
      expect(compInstance.doCheckout.bind(compInstance)).toThrowError('Missing settings configuration');
    }));

    it('should perform an http request with the contents of the cart', fakeAsync(() => {
      const response = new HttpResponse({body: 1});
      const httpReqSpy = spyOn(httpClient, 'request').and.returnValue(new Observable<HttpEvent<any>>(observer => {
        observer.next(response);
        observer.complete();
      }));
      service.addItem(new BaseCartItem({id: 1, name: 'Test item', quantity: 1, price: 1}));
      service.setShipping(20);
      service.setTaxRate(10);
      component.service = 'http';
      component.settings = {method: 'POST', url: 'http://fakeserver.com'};
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.css('cart-checkout'));
      expect(comp.componentInstance instanceof CartCheckoutComponent).toEqual(true);
      const compInstance: CartCheckoutComponent = comp.componentInstance;
      const checkoutSpy = jasmine.createSpy('httpCheckout');
      subscriptions.push(compInstance.checkout.subscribe(checkoutSpy));
      const consoleSpy = spyOn(console, 'log');
      const button = fixture.debugElement.query(By.css('button'));
      button.nativeElement.click();
      tick();
      expect(httpReqSpy).toHaveBeenCalledTimes(1);
      const lastCall = httpReqSpy.calls.mostRecent();
      expect(lastCall.args.length).toEqual(1);
      expect(lastCall.args[0].method).toEqual('POST');
      expect(lastCall.args[0].url).toEqual('http://fakeserver.com');
      expect(lastCall.args[0].body).toBeTruthy();
      expect(lastCall.args[0].body.items).toEqual(service.getItems());
      expect(lastCall.args[0].body.taxRate).toEqual(10);
      expect(lastCall.args[0].body.shipping).toEqual(20);
      expect(checkoutSpy).toHaveBeenCalledTimes(1);
      expect(checkoutSpy).toHaveBeenCalledWith(response);
      expect(consoleSpy).not.toHaveBeenCalled();
    }));

    it('should emit an error if the call fails', fakeAsync(() => {
      const err = new Error('Response error');
      const httpReqSpy = spyOn(httpClient, 'request').and.returnValue(new Observable<HttpEvent<any>>(observer => {
        observer.error(err);
        observer.complete();
      }));
      service.addItem(new BaseCartItem({id: 1, name: 'Test item', quantity: 1, price: 1}));
      component.service = 'http';
      component.settings = {method: 'POST', url: 'http://fakeserver.com'};
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.css('cart-checkout'));
      const errorSpy = jasmine.createSpy('httpCheckout');
      subscriptions.push(comp.componentInstance.error.subscribe(errorSpy));
      const button = fixture.debugElement.query(By.css('button'));
      button.nativeElement.click();
      tick();
      expect(httpReqSpy).toHaveBeenCalled();
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy).toHaveBeenCalledWith(err);
    }));
  });

  describe('Paypal service', () => {
    let component: TestServiceComponent;
    let fixture: ComponentFixture<TestServiceComponent>;
    let service: CartService<BaseCartItem>;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestServiceComponent);
      component = fixture.componentInstance;
      service = TestBed.get(CartService);
      service.clear();
    });

    it('should render a paypal form', () => {
      component.service = 'paypal';
      const setting = {business: 'Test business', currencyCode: 'USD', itemName: 'Test item', itemNumber: '1', noNote: '0'};
      component.settings = setting;
      fixture.detectChanges();
      const paypalEl = fixture.debugElement.query(By.css('cart-checkout'));
      expect(paypalEl).toBeTruthy();
      const paypalForm = paypalEl.query(By.css('form'));
      expect(paypalForm).toBeTruthy();
      const attrs = paypalForm.attributes;
      expect(attrs['action']).toEqual('https://www.paypal.com/cgi-bin/webscr');
      const inputs = paypalForm.children.filter(ch => ch.name === 'input');
      const business = inputs.find(i => i.attributes.name === 'business');
      expect(business.properties.value).toEqual(setting.business);
      const itemName = inputs.find(i => i.attributes.name === 'item_name');
      expect(itemName.properties.value).toEqual(setting.itemName);
      const itemNumber = inputs.find(i => i.attributes.name === 'item_number');
      expect(itemNumber.properties.value).toEqual(setting.itemNumber);
      const cost = inputs.find(i => i.attributes.name === 'amount');
      expect(cost.properties.value).toEqual(service.totalCost().toString());
      const currencyCode = inputs.find(i => i.attributes.name === 'currency_code');
      expect(currencyCode.properties.value).toEqual(setting.currencyCode);
      const noNote = inputs.find(i => i.attributes.name === 'no_note');
      expect(noNote.properties.value).toEqual(setting.noNote);
      const taxRate = inputs.find(i => i.attributes.name === 'tax_rate');
      expect(taxRate.properties.value).toEqual(service.getTaxRate().toString());
      const shipping = inputs.find(i => i.attributes.name === 'shipping');
      expect(shipping.properties.value).toEqual(service.getShipping().toString());
    });
  });

  afterEach(() => {
    subscriptions.forEach(s => s.unsubscribe());
    subscriptions = [];
  });
});

const TEST_CUSTOM_BUTTON_TEMPLATE = '<cart-checkout [custom]="custom"><div class="test"></div></cart-checkout>';

@Component({
  selector: 'cart-test-custom-cart-checkout',
  template: TEST_CUSTOM_BUTTON_TEMPLATE
})
class TestCustomButtonComponent {
  custom = true;
}

const TEST_SERVICE_TEMPLATE = '<cart-checkout [service]="service" [settings]="settings"></cart-checkout>';

@Component({
  selector: 'cart-test-service-checkout',
  template: TEST_SERVICE_TEMPLATE
})
class TestServiceComponent {
  service: CheckoutType;
  settings: CheckoutSettings;
}
