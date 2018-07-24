/**
 * An interface for the event emitted in the `onChange` emitter.
 */
export interface CartChangeEvent {
  /**
   * The location where the change took place
   */
  change: 'items' | 'taxRate' | 'shipping' | 'format';
  /**
   * The value in the cart after the update
   */
  value: any;
}
