import {Component} from '@angular/core';
import {CartItem} from '../../src/classes/cart-item';

@Component({
  selector: 'demo-root',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent {
  items: CartItem[];
}
