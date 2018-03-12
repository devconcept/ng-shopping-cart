import { CheckoutPaypalSettings } from './interfaces/checkout-paypal-settings';
import { RequestArgs } from '@angular/http/src/interfaces';

export type AddToCartType = 'button' | 'dropdown' | 'text' | 'number';
export type AddToCartPosition = 'top' | 'bottom' | 'left' | 'right';
export type CartViewDisplay = 'responsive' | 'adaptative' | 'fixed';
export type CheckoutType = 'log' | 'http' | 'paypal';
export type CheckoutSettings = null | CheckoutPaypalSettings | RequestArgs;
