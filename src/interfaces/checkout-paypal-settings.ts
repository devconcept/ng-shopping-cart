/**
 * The configuration for the checkout operation if the service is set to Paypal
 */
export interface CheckoutPaypalSettings {
  business: string;
  itemName: string;
  itemNumber: string;
  currencyCode: string;
  noNote: string;
}
