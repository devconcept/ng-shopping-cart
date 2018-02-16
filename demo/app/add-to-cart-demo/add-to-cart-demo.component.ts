import { Component, OnInit } from '@angular/core';
import { AddToCartType } from '../../../src/types';
import { AddToCartPosition } from '../../../src';

@Component({
  selector: 'cart-add-demo',
  templateUrl: './add-to-cart-demo.component.html',
  styleUrls: ['./add-to-cart-demo.component.scss']
})
export class AddToCartDemoComponent implements OnInit {
  editor = 'button';
  editorTypes: AddToCartType[] = ['button', 'text', 'number', 'dropdown'];
  position = 'left';
  positions: AddToCartPosition[] = ['left', 'right', 'top', 'bottom'];

  constructor() {
  }

  ngOnInit() {
  }

  addToCart(item) {
    console.log('clicked', item);
  }

}
