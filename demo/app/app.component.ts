import { Component } from '@angular/core';
import {CartItem} from '../../src/classes/cart-item';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items: CartItem[];
}
