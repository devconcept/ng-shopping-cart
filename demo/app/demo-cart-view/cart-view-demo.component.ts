import {Component} from '@angular/core';
import {CartViewDisplay} from '../../../src/types';
import {CartService} from '../../../src/classes/cart.service';
import {DemoCartItem} from '../demo-cart-item';

@Component({
  selector: 'demo-cart-view',
  templateUrl: './cart-view-demo.component.html',
  styleUrls: ['./cart-view-demo.component.scss']
})
export class CartViewDemoComponent {
  display: CartViewDisplay = 'responsive-table';
  tax = 0;
  shipping = 0;
  showImages = true;
  useCustom = false;

  settingsCollapsed = false;
  resultsCollapsed = false;

  constructor(public cartService: CartService<DemoCartItem>) {

  }

  setTaxRate() {
    const val = parseFloat(this.tax.toString());
    this.cartService.setTaxRate(val);
    this.tax = this.cartService.getTaxRate();
  }

  setShipping() {
    const val = parseFloat(this.shipping.toString());
    this.cartService.setShipping(val);
    this.shipping = this.cartService.getShipping();
  }
}
