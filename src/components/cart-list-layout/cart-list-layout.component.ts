import { Component, Input } from '@angular/core';
import { CartItem } from '../../classes/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'cart-list-layout',
  templateUrl: './cart-list-layout.component.html',
})
export class CartListLayoutComponent {
  @Input() items: CartItem[];

  constructor(private cartService: CartService) {

  }

  increase(item: CartItem) {
    item.quantity++;
    this.cartService.addItem(item.id, item.name, item.price, item.quantity, item.data);
  }

  decrease(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
    }
    this.cartService.addItem(item.id, item.name, item.price, item.quantity, item.data);
  }
}
