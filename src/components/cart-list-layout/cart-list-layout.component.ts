import { Component, Input } from '@angular/core';
import { CartItem } from '../../classes/cart-item';
import { CartViewDisplay } from '../../types';

@Component({
  selector: 'cart-list-layout',
  templateUrl: './cart-list-layout.component.html',
})
export class CartListLayoutComponent {
  @Input() items: CartItem[];
}
