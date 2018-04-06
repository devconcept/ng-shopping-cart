import { InjectionToken } from '@angular/core';
import { CartItem } from '../classes/cart-item';

/**
 * An injection token to resolve the class used to create CartItem instances
 */
export const CART_ITEM_CLASS = new InjectionToken<CartItem>('CartItemClass');
