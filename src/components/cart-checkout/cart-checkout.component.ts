import {Component, EventEmitter, Inject, Input, LOCALE_ID, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {CurrencyPipe, getLocaleCurrencyName} from '@angular/common';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';

import {CheckoutSettings, CheckoutType} from '../../types';
import {CartService} from '../../services/cart.service';
import {CheckoutPaypalSettings} from '../../interfaces/checkout-paypal-settings';
import {CheckoutHttpSettings} from '../../interfaces/checkout-http-settings';
import {LocaleFormat} from '../../interfaces/locale-format';
import {parseLocaleFormat} from '../../locales';

/**
 * Renders a button to initiate checkout of the cart.
 *
 * @order 6
 * @howToUse "With a custom button or projected content"
 * ```html
 * <cart-checkout [custom]="true">
 *    <button type="button" class="my-custom-class">Do checkout</button>
 * </cart-checkout>
 * ```
 *
 * @howToUse "With different text and classes"
 * ```html
 * <cart-checkout [buttonText]="'Add item'" [buttonClass]="'my-custom-class'">
 * </cart-checkout>
 * ```
 *
 * @howToUse "Using http in a protected endpoint"
 * ```html
 * <cart-checkout [service]="'http'" settings="settings">
 * </cart-checkout>
 * ```
 * ```typescript
 * export class MyComponent {
 *   settings: CheckoutHttpSettings = {
 *     method: 'POST',
 *     url: 'http://myapi.com/',
 *     options: { headers: { Authorization: 'Bearer my-auth-token' } }
 *   };
 * }
 * ```
 *
 * @howToUse "Using the PayPal service"
 * ```html
 * <cart-checkout [service]="'paypal'" settings="settings">
 * </cart-checkout>
 * ```
 * ```typescript
 * export class MyComponent {
 *  settings: CheckoutPaypalSettings = {
 *    business: 'myaccount@paypal.com',
 *    itemName: 'myMarketplaceAppCart',
 *    itemNumber: '1234',
 *    serviceName: 'MyBusiness',
 *    country: 'US'
 *  };
 * }
 * ```
 *
 * @note {warning} This component captures clicks events bubbling from its projected content. Make sure the event keeps bubbling only when
 * you want the checkout operation to start.
 *
 * @note {warning} When the `[service]` is set to `paypal` an actual PayPal button is rendered. None of the inputs `custom`, `buttonText`
 * or `buttonClass` have any effect.
 */
@Component({
  selector: 'cart-checkout',
  templateUrl: './cart-checkout.component.html',
})
export class CartCheckoutComponent implements OnChanges, OnInit, OnDestroy {
  private _serviceSubscription: any;
  private getLocaleCurrencyName: any;
  empty = true;
  cost = 0;
  taxRate = 0;
  shipping = 0;
  httpSettings: CheckoutHttpSettings;
  paypalSettings: CheckoutPaypalSettings;
  format: LocaleFormat;
  currency = 'USD';
  paypalLocale = 'en';
  /**
   * If `false` displays a default button provided by the component. When set to `true` projects the contents of the component.
   */
  @Input() custom = false;
  /**
   * Changes the default text of the component's button.
   */
  @Input() buttonText = 'Checkout';
  /**
   * Changes the default text of the component's button.
   */
  @Input() buttonClass = 'cart-checkout-button';
  /**
   * Sets the type of service to be used when initiating the checkout.
   */
  @Input() service: CheckoutType = 'log';
  /**
   * Depending on the type of the service you might need to add some configuration to it. This input allows you to change that
   * configuration.
   */
  @Input() settings: CheckoutSettings = null;
  /**
   * Changes currency display format for the component. Overrides the value set from the service using `setCurrencyFormat`.
   */
  @Input() localeFormat: string;
  /**
   * Emits the result of the checkout operation. If the service is set to `'log'` it emits the entire cart object including tax rates and
   * shipping info. If is set to `'http'` it emits an `HttpResponse` object with body, headers, etc as it was received by the remote server.
   *
   * > When `[service]` is set to `'paypal'` this event is never emitted.
   */
  @Output() checkout = new EventEmitter<any>();
  /**
   * When the `[service]` is set to `'http'` and the checkout operation fails the thrown error can be captured using this output.
   *
   * The emitted value is the complete `HttpErrorResponse` object returned by `HttpClient` so you can inspect other properties like status
   * codes, headers, messages, etc.
   */
  @Output() error = new EventEmitter<any>();

  constructor(private cartService: CartService<any>, private httpClient: HttpClient, @Inject(LOCALE_ID) private locale: string) {
    this.getLocaleCurrencyName = getLocaleCurrencyName;
  }

  ngOnInit(): void {
    this.updateCart(true);
    this._serviceSubscription = this.cartService
      .onChange
      .subscribe((evt) => this.updateCart(evt.change === 'format'));
  }

  private updateCart(formatChange) {
    this.empty = this.cartService.isEmpty();
    this.cost = this.cartService.cost();
    this.taxRate = this.cartService.getTaxRate();
    this.shipping = this.cartService.getShipping();
    if (formatChange) {
      this.updateLocale();
    }
  }

  private updateLocale() {
    this.format = this.localeFormat ?
      parseLocaleFormat(this.localeFormat) :
      <LocaleFormat>this.cartService.getLocaleFormat(true);
    const loc = this.format.locale || this.locale;
    this.paypalLocale = loc.substring(0, 2);
    this.currency = this.format.currencyCode || this.getCurrency(loc);
  }

  private getCurrency(locale) {
    const currencyCode = this.getLocaleCurrencyName(locale);
    if (!currencyCode) {
      return 'USD';
    }
    if (currencyCode.length === 3) {
      return currencyCode;
    }
    // Angular < 6 return "US Dollar" instead of "USD" so we have to hack the code using the currency pipe
    // You will also get USD on locales where you should get EUR so for those versions currencyCode must be used
    const fmt = new CurrencyPipe(locale);
    const val = fmt.transform(0, undefined, 'code', '1.0-0', locale);
    const pre = val.startsWith('0');
    return val.substr(pre ? -3 : 0, 3);
  }

  doCheckout() {
    let cart: any = this.cartService.toObject();
    switch (this.service) {
      case 'log':
        console.log(cart);
        this.checkout.emit(cart);
        break;
      case 'http':
        if (!this.settings) {
          throw new Error('Missing settings configuration');
        }
        const verbs = ['POST', 'PUT', 'PATCH'];
        const {url, method = 'POST', options, body} = this.httpSettings;
        const methodUpper = method.toUpperCase();
        if (verbs.indexOf(methodUpper) === -1) {
          throw new Error(`Invalid http verb found in method setting. Expected one of ${verbs.join(' ')} and got ${method}`);
        }
        if (body) {
          cart = typeof body === 'function' ? body(cart) : Object.assign({}, cart, body);
        }
        if (options && options.headers && options.headers.has('Content-Type')) {
          const contentType = options.headers.get('Content-Type');
          if (contentType.startsWith('application/x-www-form-urlencoded')) {
            cart = new HttpParams({fromObject: cart});
          }
        }
        this.httpClient
          .request(new HttpRequest(methodUpper, url, cart, options))
          .toPromise()
          .then(response => {
            this.checkout.emit(response);
          })
          .catch(err => {
            this.error.emit(err);
          });
        break;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['settings'] && changes['settings'].currentValue) {
      const hasOwn = Object.prototype.hasOwnProperty;
      const value = changes['settings'].currentValue;
      if (hasOwn.call(value, 'business')) {
        this.paypalSettings = changes['settings'].currentValue;
      }
      if (hasOwn.call(value, 'url')) {
        this.httpSettings = changes['settings'].currentValue;
      }
    }
    if (changes['localeFormat']) {
      this.updateLocale();
    }
  }

  ngOnDestroy(): void {
    this._serviceSubscription.unsubscribe();
  }
}
