import {Component} from '@angular/core';
import {ShowcaseItem, CartItem} from 'ng-shopping-cart';

@Component({
  selector: 'demo-demo-showcase-item-component',
  templateUrl: './demo-showcase-item.component.html',
  styleUrls: ['./demo-showcase-item.component.scss']
})
export class DemoShowcaseItemComponent implements ShowcaseItem {
  item: CartItem;
}
