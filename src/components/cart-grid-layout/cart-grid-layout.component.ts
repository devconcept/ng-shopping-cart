import { Component, Input } from '@angular/core';
import { CartItem } from '../../classes/cart-item';

@Component({
  selector: 'cart-grid-layout',
  templateUrl: './cart-grid-layout.component.html',
})
export class CartGridLayoutComponent  {
  @Input() items: CartItem[] = [];

}
