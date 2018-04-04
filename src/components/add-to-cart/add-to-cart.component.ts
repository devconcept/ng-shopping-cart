import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DropdownValue } from '../../interfaces/dropdown-value';
import { AddToCartPosition, AddToCartType } from '../../types';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../classes/cart-item';

@Component({
  selector: 'add-to-cart', // tslint:disable-line component-selector
  templateUrl: './add-to-cart.component.html',
})
export class AddToCartComponent implements OnChanges {
  private _editorQuantity = 1;
  @Input() custom = false;
  @Input() item: CartItem;
  @Input() buttonText = 'Add to cart';
  @Input() buttonClass = 'add-to-cart-button';
  @Input() type: AddToCartType = 'button';
  @Input() position: AddToCartPosition = 'left';
  @Input() dropdown: DropdownValue[] = [{ label: '1 item', value: 1 }, { label: '2 item', value: 2 }, { label: '5 items', value: 5 }];
  @Input() quantity: number;
  @Output() change = new EventEmitter<number>();
  @Output() added = new EventEmitter<CartItem>();

  get editorQuantity(): number {
    return this._editorQuantity;
  }

  set editorQuantity(value: number) {
    this._editorQuantity = value;
    this.change.emit(value);
  }

  constructor(private cartService: CartService<any>) {
  }

  private itemQuantity(): number {
    if (this.type === 'button') {
      if (this.quantity) {
        return this.quantity;
      }
      if (this.item) {
        return this.item.getQuantity();
      }
      return 1;
    } else {
      return this._editorQuantity;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type'] && changes['type'].currentValue === 'dropdown' && this.dropdown.length) {
      const quantity = this.itemQuantity();
      const match = this.dropdown.find(i => i.value === quantity);
      if (!match) {
        this._editorQuantity = this.dropdown[0].value;
      }
    }
  }

  addToCart(evt) {
    evt.stopPropagation();
    if (this.item) {
      const quantity = this.itemQuantity();
      this.item.setQuantity(quantity);
      this.cartService.addItem(this.item);
      this.added.emit(this.item);
    }
  }

}
