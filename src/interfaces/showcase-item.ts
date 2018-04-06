import { CartItem } from '../classes/cart-item';

/**
 * An interface that all Showcase item components must implement to interop with the Showcase component. For each item a new component
 * is generated dynamically.
 */
export interface ShowcaseItem {
  /**
   * This field will receive the CartItem for the component instance.
   */
  item: CartItem;
}
