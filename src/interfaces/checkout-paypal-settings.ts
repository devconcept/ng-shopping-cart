/**
 * The configuration for the checkout operation if the service is set to Paypal
 */
export interface CheckoutPaypalSettings {
  /**
   * Your PayPal ID or an email address associated with your PayPal account. Email addresses must be confirmed.
   */
  business: string;
  /**
   * Description of item being sold.
   *
   * If you omit this variable, buyers enter their own name during checkout.
   */
  itemName?: string;
  /**
   * Pass-through variable for you to track product or service purchased or the contribution made.
   */
  itemNumber?: string;
  /**
   * The name of the service that creates the button. This is usually a reference to the name of your site or application.
   *
   * This is a fragment of what is know as build notation.
   */
  serviceName?: string;
  /**
   * The country fragment of the build notation.
   *
   * If you don't provide both the `serviceName` and the `country` no build notation is used.
   */
  country?: string;
}
