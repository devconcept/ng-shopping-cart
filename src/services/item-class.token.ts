import { InjectionToken } from '@angular/core';
import { CartItem } from '../classes/cart-item';

export const CART_ITEM_CLASS = new InjectionToken<CartItem>('CartItemClass');
