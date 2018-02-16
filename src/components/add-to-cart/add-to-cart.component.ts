import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DropdownValue } from '../../interfaces/dropdown-value';
import { AddToCartPosition, AddToCartType } from '../../types';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'add-to-cart', // tslint:disable-line component-selector
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnChanges {
  quantity = 1;
  @Input() label = 'Add to cart';
  @Input() buttonClass = 'add-to-cart-button';
  @Input() type: AddToCartType = 'button';
  @Input() position: AddToCartPosition = 'left';
  @Output() add = new EventEmitter();
  @Input() dropdown: DropdownValue[] = [{ label: '1 item', value: 1 }, { label: '2 item', value: 2 }, { label: '5 items', value: 5 }];

  constructor(private cartService: CartService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type'] && changes['type'].currentValue === 'dropdown' && this.dropdown.length) {
      const match = this.dropdown.find(i => i.value === this.quantity);
      if (!match) {
        this.quantity = this.dropdown[0].value;
      }
    }
  }

  addToCart(evt) {
    evt.stopPropagation();
    const item = this.cartService.addItem({});
    item.quantity = this.quantity;
    this.add.emit(item);
  }

}
