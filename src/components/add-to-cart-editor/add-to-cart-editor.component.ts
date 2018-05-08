import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownValue } from '../../interfaces/dropdown-value';
import { AddToCartType } from '../../types';

/**
 * An editor to change the quantity of an item to add to the cart.
 * @ignore
 */
@Component({
  selector: 'add-to-cart-editor', // tslint:disable-line component-selector
  templateUrl: './add-to-cart-editor.component.html',
})
export class AddToCartEditorComponent {
  /**
   * The type of editor to display.
   */
  @Input() type: AddToCartType = 'text';
  /**
   * A list of values to display in the dropdown editor.
   */
  @Input() dropdown: DropdownValue[];
  /**
   * The value to display in the editor
   */
  @Input() value = 1;
  /**
   * Emits a the value of the editor when the user changes it
   */
  @Output() valueChange = new EventEmitter<number>();

  changeValue(value: any) {
    const val = parseFloat(value);
    this.valueChange.emit(Number.isNaN(val) ? 1 : val);
  }
}
