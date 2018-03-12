import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { CheckoutSettings, CheckoutType } from '../../types';
import { CartService } from '../../services/cart.service';
import { Http, Request } from '@angular/http';
import { CheckoutPaypalSettings } from '../../interfaces/checkout-paypal-settings';
import { RequestArgs } from '@angular/http/src/interfaces';

@Component({
  selector: 'cart-checkout',
  templateUrl: './cart-checkout.component.html',
})
export class CartCheckoutComponent implements OnChanges, OnInit, OnDestroy {
  private cartSubscription: EventEmitter<any>;
  labelSet = false;
  empty = true;
  cost = 0;
  taxRate = 0;
  shipping = 0;
  httpSettings: RequestArgs;
  paypalSettings: CheckoutPaypalSettings;
  @Input() label = 'Checkout';
  @Input() service: CheckoutType = 'log';
  @Input() settings: CheckoutSettings = null;
  @Output() checkout = new EventEmitter<any>();
  @Output() error = new EventEmitter<any>();

  constructor(private cartService: CartService<any>, private http: Http) {

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
        this.http
          .request(new Request(this.httpSettings))
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
    if (changes['label']) {
      this.labelSet = true;
    }
    if (changes['settings'] && changes['settings'].currentValue) {
      const settingsValue = changes['settings'].currentValue;
      if (settingsValue.itemName) {
        this.paypalSettings = settingsValue;
      } else {
        this.httpSettings = settingsValue;
      }
    }
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
}
