import {Component} from '@angular/core';
import {ShowcaseItem} from '../../../src/interfaces/showcase-item';
import {CartItem} from '../../../src/classes/cart-item';

@Component({
  selector: 'demo-demo-showcase-item-component',
  templateUrl: './demo-showcase-item.component.html',
  styleUrls: ['./demo-showcase-item.component.scss']
})
export class DemoShowcaseItemComponent implements ShowcaseItem {
  item: CartItem;
  format: string;
}
