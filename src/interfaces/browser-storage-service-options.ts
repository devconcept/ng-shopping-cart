/**
 * The configuration for all CartService implementations that use the browser storage.
 */
export interface BrowserStorageServiceConfiguration {
  /**
   * The key where all the information of the cart will be stored.
   */
  storageKey?: string;
  /**
   * Whether to clear the cart or not if an error is found when de-serializing the items.
   */
  clearOnError?: boolean;
}
