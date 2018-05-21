import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {CartService} from 'ng-shopping-cart';
import {DemoCartItem} from '../demo-cart-item';

@Component({
  selector: 'demo-cart-checkout',
  templateUrl: './demo-cart-checkout.component.html',
  styleUrls: ['./demo-cart-checkout.component.scss'],
})
export class DemoCheckoutComponent implements OnInit, OnDestroy {
  private serviceSubstription: EventEmitter<any>;
  custom = false;
  label = 'Checkout';
  settingsCollapsed = false;
  resultsCollapsed = false;
  disabled = false;

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

  ngOnDestroy(): void {
    this.serviceSubstription.unsubscribe();
  }

}
