import { Component } from '@angular/core';
import { ShowcaseItem } from '../../interfaces/showcase-item';
import { CartItem } from '../../classes/cart-item';

@Component({
  selector: 'cart-showcase-item',
  templateUrl: './cart-showcase-item.component.html',
  styleUrls: ['./cart-showcase-item.component.scss']
})
export class CartShowcaseItemComponent implements ShowcaseItem {
  item: CartItem;

  constructor() {
  }

}
