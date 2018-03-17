import { InjectionToken } from '@angular/core';
import { CartItem } from '../classes/cart-item';

export const ITEM_CLASS = new InjectionToken<CartItem>('CartItemClass');
