import {CartItem} from '../classes/cart-item';

/**
 * An interface that all `CartShowcase` item components must implement to interop with the `cart-showcase` component.
 *
 * For each item a new component is generated dynamically.
 */
export interface ShowcaseItem {
  /**
   * This field will receive the `CartItem` object for the component instance.
   */
  item: CartItem;
}
