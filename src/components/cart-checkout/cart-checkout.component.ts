import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { CheckoutSettings, CheckoutType } from '../../types';
import { CartService } from '../../services/cart.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { CheckoutPaypalSettings } from '../../interfaces/checkout-paypal-settings';
import { CheckoutHttpSettings } from '../../interfaces/checkout-http-settings';

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
  @Input() custom = false;
  @Input() label = 'Checkout';
  @Input() service: CheckoutType = 'log';
  @Input() settings: CheckoutSettings = null;
  @Output() checkout = new EventEmitter<any>();
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
    const body = this.cartService.getItems();
    switch (this.service) {
      case 'log':
        console.log(body);
        this.checkout.emit(body);
        break;
      case 'http':
        if (!this.settings) {
          throw new Error('Missing settings configuration');
        }
        const { url, method, options } = this.httpSettings;
        const opts = {...options, body: this.cartService.getItems()};
        this.httpClient
          .request(new HttpRequest(method, url, opts))
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
