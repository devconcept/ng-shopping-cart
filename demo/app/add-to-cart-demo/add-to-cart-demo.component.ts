import { Component } from '@angular/core';
import { AddToCartType, AddToCartPosition, CartService } from '../../../src';

@Component({
  selector: 'cart-add-demo',
  templateUrl: './add-to-cart-demo.component.html',
  styleUrls: ['./add-to-cart-demo.component.scss']
})
export class AddToCartDemoComponent {
  cartItem = { key: 1, label: 'Test', cost: 14.5, description: 'Test description', origin: 'Singapore' };
  quantity = 1;
  contents: 'text' | 'html' = 'text';
  label = 'Add to cart';
  editor = 'button';
  editorTypes: AddToCartType[] = ['button', 'text', 'number', 'dropdown'];
  position = 'left';
  positions: AddToCartPosition[] = ['left', 'right', 'top', 'bottom'];

  constructor(private cartService: CartService) {
  }

  addToCart(item) {
    console.log('added', item);
    console.log('cart items', this.cartService.getItems());
  }

}
