/**
 * The configuration for the checkout operation if the service is set to http.
 */
export interface CheckoutHttpSettings {
  /**
   * The HTTP method to use to perform the request. The body is used to send the contents of the cart so using get or delete verbs will
   * not work
   */
  method: string;
  /**
   * The url to direct the checkout request
   */
  url: string;
  /**
   * Headers and other options for the checkout http request. Check the `HttpRequest` class in Angular documentation.
   */
  options?: any;
}
