import { CheckoutPaypalSettings } from './interfaces/checkout-paypal-settings';
import { CheckoutHttpSettings } from './interfaces/checkout-http-settings';

export type AddToCartType = 'button' | 'dropdown' | 'text' | 'number';
export type AddToCartPosition = 'top' | 'bottom' | 'left' | 'right';
export type CartViewDisplay = 'responsive' | 'adaptative' | 'fixed';
export type CheckoutType = 'log' | 'http' | 'paypal';
export type CheckoutSettings = null | CheckoutPaypalSettings | CheckoutHttpSettings;
