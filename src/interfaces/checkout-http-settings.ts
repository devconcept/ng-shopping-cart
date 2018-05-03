/**
 * The configuration for the checkout operation if the service is set to http.
 */
export interface CheckoutHttpSettings {
  /**
   * The HTTP method to use to perform the request
   */
  method: string;
  /**
   * The url to direct the checkout request
   */
  url: string;
  /**
   * Headers and other options for the checkout http request.
   */
  options?: any;
}
