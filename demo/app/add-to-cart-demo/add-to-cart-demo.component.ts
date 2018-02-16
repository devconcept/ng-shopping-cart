import { Component, OnInit } from '@angular/core';
import { AddToCartType } from '../../../src/types/add-to-cart-type';

@Component({
  selector: 'cart-add-demo',
  templateUrl: './add-to-cart-demo.component.html',
  styleUrls: ['./add-to-cart-demo.component.scss']
})
export class AddToCartDemoComponent implements OnInit {
  editor = 'button';
  editorTypes: AddToCartType[] = ['button', 'text', 'number', 'dropdown'];
  position = 'left';
  positions: string[] = ['left', 'right', 'above', 'below'];

  constructor() {
  }

  ngOnInit() {
  }

  addToCart() {
    console.log('clicked');
  }

}
