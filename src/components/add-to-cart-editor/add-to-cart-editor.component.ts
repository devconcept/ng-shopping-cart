import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownValue } from '../../interfaces/dropdown-value';
import {AddToCartType} from '../../types';

@Component({
  selector: 'add-to-cart-editor', // tslint:disable-line component-selector
  templateUrl: './add-to-cart-editor.component.html',
  styleUrls: ['./add-to-cart-editor.component.scss']
})
export class AddToCartEditorComponent {
  @Input() type: AddToCartType;
  @Input() dropdown: DropdownValue[];
  @Input() value: number;
  @Output() valueChange = new EventEmitter<number>();

  changeValue(value: any) {
    const val = parseFloat(value);
    this.valueChange.emit(Number.isNaN(val) ? 0 : val);
  }
}
