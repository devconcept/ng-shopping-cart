import { CartModuleServiceType } from '../types';

/**
 * Configuration options for the NgShoppingCart module in the root module of your application.
 */
export interface CartModuleOptions  {
  /**
   * The class reference for the items used in your cart.
   */
  itemType?: any;
  /**
   * Sets the type of service to use.
   */
  serviceType?: CartModuleServiceType;
  /**
   * Configuration for the service if any is required.
   */
  serviceOptions?: any;
}
