import {Component} from '@angular/core';
import {ShowcaseItem} from '../../interfaces/showcase-item';
import {CartItem} from '../../classes/cart-item';

/**
 * The default implementation of a showcase item.
 *
 * @note {info} This component is only intended to be used as a template for you to create your own components either by pure css
 * customization or by providing an actually working sample to serve as a guide for more complex cases.
 *
 * @order 5
 */
@Component({
  selector: 'cart-showcase-item',
  templateUrl: './cart-showcase-item.component.html',
})
export class CartShowcaseItemComponent implements ShowcaseItem {
  /**
   * Inherited from the interface `ShowcaseItem`
   */
  item: CartItem;
  /**
   * Inherited from the interface `ShowcaseItem`
   */
  format: string;
}
