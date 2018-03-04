import { Component } from '@angular/core';
import { AddToCartType, AddToCartPosition, CartService } from '../../../src';
import { DemoCartItem } from './demo-cart-item';
import { CartItem } from '../../../src/classes/cart-item';

@Component({
  selector: 'cart-add-demo',
  templateUrl: './add-to-cart-demo.component.html',
  styleUrls: ['./add-to-cart-demo.component.scss']
})
export class AddToCartDemoComponent {
  cartItem: DemoCartItem;
  quantity = 1;
  contents: 'text' | 'html' = 'text';
  label = 'Add to cart';
  editor = 'button';
  editorTypes: AddToCartType[] = ['button', 'text', 'number', 'dropdown'];
  position = 'left';
  positions: AddToCartPosition[] = ['left', 'right', 'top', 'bottom'];

  constructor(private cartService: CartService) {
    this.cartItem = new DemoCartItem();
    this.cartItem.identifier = '1';
    this.cartItem.label = 'Test';
    this.cartItem.cost = 14.5;
    this.cartItem.description = 'Test description';
    this.cartItem.country = 'US';
  }

  addToCart(item) {
    console.log('added', item);
    console.log('cart items', this.cartService.getItems());
  }

}
