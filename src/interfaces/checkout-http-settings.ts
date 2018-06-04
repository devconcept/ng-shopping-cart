/**
 * The configuration for the checkout operation if the service is set to http.
 */
import {HttpOptions} from './http-options';

export interface CheckoutHttpSettings {
  /**
   * The url to direct the checkout request
   */
  url: string;
  /**
   * The HTTP verb to perform the request. The body is used to send the contents of the cart so using `GET`, `JSONP` or `DELETE`
   * verbs will throw an error.
   */
  method?: string;
  /**
   * Headers, params and other options for the checkout http request. Check the `HttpRequest` class in Angular documentation.
   */
  options?: HttpOptions;
}
