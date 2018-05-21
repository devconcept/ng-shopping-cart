import { Component } from '@angular/core';
import {CartItem} from 'ng-shopping-cart';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items: CartItem[];
}
