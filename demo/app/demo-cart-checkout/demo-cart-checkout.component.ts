import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../../../src/services/cart.service';
import {CheckoutType} from '../../../src/types';
import {DemoCartItem} from '../demo-cart-item';
import {CheckoutHttpSettings} from '../../../src/interfaces/checkout-http-settings';
import {CheckoutPaypalSettings} from '../../../src/interfaces/checkout-paypal-settings';

@Component({
  selector: 'demo-cart-checkout',
  templateUrl: './demo-cart-checkout.component.html',
  styleUrls: ['./demo-cart-checkout.component.scss'],
})
export class DemoCheckoutComponent implements OnInit, OnDestroy {
  private serviceSubstription: EventEmitter<any>;
  custom = false;
  label = 'Checkout';
  service: CheckoutType = 'log';
  settingsCollapsed = false;
  resultsCollapsed = false;
  disabled = false;
  httpConfig: CheckoutHttpSettings = {url: '', method: 'POST'};
  paypalConfig: CheckoutPaypalSettings = {business: '', currencyCode: 'USD', itemName: '', itemNumber: '0', noNote: '0'};

  constructor(private cartService: CartService<DemoCartItem>) {

  }

  ngOnInit(): void {
    this.checkService();
    this.serviceSubstription = this.cartService.onItemsChanged.subscribe(() => {
      this.checkService();
    });
  }

  checkService() {
    this.disabled = this.cartService.isEmpty();
  }

  onSuccess(data) {
    console.log('Checkout successful');
    console.error(data);
  }

  onError(err) {
    console.log('An http error was received');
    console.dir(err);
  }

  ngOnDestroy(): void {
    this.serviceSubstription.unsubscribe();
  }

}
