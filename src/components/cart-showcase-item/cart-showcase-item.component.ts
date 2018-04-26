import { Component } from '@angular/core';
import { ShowcaseItem } from '../../interfaces/showcase-item';
import { CartItem } from '../../classes/cart-item';

/**
 * The default implementation of a showcase item
 */
@Component({
  selector: 'cart-showcase-item',
  templateUrl: './cart-showcase-item.component.html',
})
export class CartShowcaseItemComponent implements ShowcaseItem {
  /**
   * The required member from the interface `ShowcaseItem`
   */
  item: CartItem;
}
