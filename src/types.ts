import { CheckoutPaypalSettings } from './interfaces/checkout-paypal-settings';
import { CheckoutHttpSettings } from './interfaces/checkout-http-settings';

/**
 * The editor to render in the add to cart component
 * @means `'button'`: No editor
 * @means `'dropdown'`: A html select element is used to display discrete values
 * @means `'text'`: A html text input element is used to edit quantity
 * @means `'number'`: A html number input element is used to edit quantity
 */
export type AddToCartType = 'button' | 'dropdown' | 'text' | 'number';
/**
 * The position where to place the editor if present
 * @means `'top'`: The editor is displayed above the add button
 * @means `'bottom'`: The editor is displayed below the add button
 * @means `'left'`: The editor is displayed on the same line on the left of the add button
 * @means `'right'`: The editor is displayed on the same line on the right of the add button
 */
export type AddToCartPosition = 'top' | 'bottom' | 'left' | 'right';
/**
 * The used layout to render the cart-view component
 * @means `'responsive'`: On small screens each item is displayed like a card. On other resolutions a table layout is used
 * @means `'responsive-table'`: On small screens scrollbars appear to prevent the content from overflowing
 * @means `'fixed'`: No adjustments are done and the content might overflow the container
 */
export type CartViewDisplay = 'responsive' | 'responsive-table' | 'fixed';
/**
 * The service to use when starting the checkout operation
 * @means `'log'`: Pressing the checkout button renders the cart contents on the console
 * @means `'http'`: An http request (usually a POST) is used to send the contents of the cart to a remote server
 * @means `'paypal'`: A Paypal standard form payment is initiated with the contents of the cart
 */
export type CheckoutType = 'log' | 'http' | 'paypal';
/**
 * The checkout configuration
 * @means `null`: The log service does not require configuration
 * @means `CheckoutHttpSettings`: An interface to configure the http request in the checkout process
 * @means `CheckoutPaypalSettings`: An interface to configure Paypal variables when performing the checkout
 */
export type CheckoutSettings = null | CheckoutHttpSettings | CheckoutPaypalSettings;
/**
 * The CartService implementation used to store items
 * @means `'memory'`: A service that stores items in memory
 * @means `'localStorage'`: A service that persist items indefinitely in localStorage. It also keeps a copy in memory for fast access
 * @means `'sessionStorage'`: A service that stores items in sessionStorage until the user closes the page. It also caches items in memory.
 */
export type CartModuleServiceType = 'memory' | 'localStorage' | 'sessionStorage';
