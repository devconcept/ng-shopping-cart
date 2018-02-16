import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropdownValue } from '../../interfaces/dropdown-value';
import { AddToCartType } from '../../types/add-to-cart-type';

@Component({
  selector: 'add-to-cart', // tslint:disable-line component-selector
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {
  @Input() label = 'Add to cart';
  @Input() buttonClass = 'add-to-cart';
  @Input() type: AddToCartType = 'button';
  @Input() position: 'above' | 'below' | 'left' | 'right' = 'left';
  @Output() add = new EventEmitter();
  @Input() dropdown: DropdownValue[] = [{ label: '1 item', value: 1 }, { label: '2 item', value: 2 }, { label: '5 items', value: 3 }];

  constructor() {
  }

  ngOnInit() {
  }

  addClick(evt) {
    evt.stopPropagation();
    this.add.emit();
  }

}
