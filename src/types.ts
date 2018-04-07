import { CheckoutPaypalSettings } from './interfaces/checkout-paypal-settings';
import { CheckoutHttpSettings } from './interfaces/checkout-http-settings';

export type AddToCartType = 'button' | 'dropdown' | 'text' | 'number';
export type AddToCartPosition = 'top' | 'bottom' | 'left' | 'right';
export type CartViewDisplay = 'responsive' | 'responsive-table' | 'fixed';
export type CheckoutType = 'log' | 'http' | 'paypal';
export type CheckoutSettings = null | CheckoutPaypalSettings | CheckoutHttpSettings;
export type CartModuleServiceType = 'memory' | 'localStorage' | 'sessionStorage';
