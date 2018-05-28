import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {CheckoutSettings, CheckoutType} from '../../types';
import {CartService} from '../../classes/cart.service';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {CheckoutPaypalSettings} from '../../interfaces/checkout-paypal-settings';
import {CheckoutHttpSettings} from '../../interfaces/checkout-http-settings';

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
 *     method: 'post',
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
 *    currencyCode: 'USD',
 *    noNote: '1'
 *  };
 * }
 * ```
 *
 * @note {warning} This component captures clicks events bubbling from its projected content. Make sure the event keeps bubbling only when
 * you want the checkout operation to start.
 */
@Component({
  selector: 'cart-checkout',
  templateUrl: './cart-checkout.component.html',
})
export class CartCheckoutComponent implements OnChanges, OnInit, OnDestroy {
  private cartSubscription: EventEmitter<any>;
  empty = true;
  cost = 0;
  taxRate = 0;
  shipping = 0;
  httpSettings: CheckoutHttpSettings;
  paypalSettings: CheckoutPaypalSettings;
  /**
   *  If false displays a default button provided by the component. When set to true projects the contents of the component.
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
   * Emits the result of the checkout operation. When `[service]` is set to `'paypal'` this event is never emitted.
   */
  @Output() checkout = new EventEmitter<any>();
  /**
   * When the `[service]` is set to `'http'` and the checkout operation fails the error thrown can be captured using this output.
   */
  @Output() error = new EventEmitter<any>();

  constructor(private cartService: CartService<any>, private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    this.updateCart();
    this.cartSubscription = this.cartService.onItemsChanged.subscribe(() => this.updateCart());
  }

  updateCart() {
    this.empty = this.cartService.isEmpty();
    this.cost = this.cartService.cost();
    this.taxRate = this.cartService.getTaxRate();
    this.shipping = this.cartService.getShipping();
  }

  doCheckout() {
    const body = this.cartService.toObject();
    switch (this.service) {
      case 'log':
        console.log(body);
        this.checkout.emit(body);
        break;
      case 'http':
        if (!this.settings) {
          throw new Error('Missing settings configuration');
        }
        const {url, method, options} = this.httpSettings;
        this.httpClient
          .request(new HttpRequest(method, url, body, options))
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
    if (changes['settings'] && changes['settings'].currentValue && changes['settings'].currentValue.itemName) {
      this.paypalSettings = changes['settings'].currentValue;
    }
    if (changes['settings'] && changes['settings'].currentValue && changes['settings'].currentValue.url) {
      this.httpSettings = changes['settings'].currentValue;
    }
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
}
