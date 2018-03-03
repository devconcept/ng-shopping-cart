import { Component, Input } from '@angular/core';
import { CartItem } from '../../classes/cart-item';
import { ShowcaseItem } from '../../interfaces/showcase-item';
import { CartShowcaseItemComponent } from '../../components/cart-showcase-item/cart-showcase-item.component';

@Component({
  selector: 'cart-showcase',
  templateUrl: './cart-showcase.component.html',
})
export class CartShowcaseComponent {
  @Input() items: CartItem[];
  @Input() itemComponent: any = CartShowcaseItemComponent;
}
