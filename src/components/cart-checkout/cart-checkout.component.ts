import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CheckoutType } from '../../types';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'cart-checkout',
  templateUrl: './cart-checkout.component.html',
})
export class CartCheckoutComponent implements OnChanges {
  labelSet = false;
  @Input() label = 'Checkout';
  @Input() service: CheckoutType = 'log';
  @Input() settings: any;

  constructor(private cartService: CartService<any>) {

  }

  checkout() {
    switch (this.service) {
      case 'log':
        console.log(this.cartService.getItems());
        break;
      case 'http':
        break;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['label']) {
      this.labelSet = true;
    }
  }
}
