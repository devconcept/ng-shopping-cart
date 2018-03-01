import { Component, Input } from '@angular/core';
import { CartItem } from '../../classes/cart-item';

@Component({
  selector: 'cart-cart-grid-layout',
  templateUrl: './cart-grid-layout.component.html',
  styleUrls: ['./cart-grid-layout.component.scss']
})
export class CartGridLayoutComponent  {
  @Input() items: CartItem[] = [];
  constructor() { }

}
