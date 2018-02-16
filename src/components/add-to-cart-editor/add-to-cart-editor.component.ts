import { Component, Input } from '@angular/core';
import { DropdownValue } from '../../interfaces/dropdown-value';
import {AddToCartType} from '../../types/add-to-cart-type';

@Component({
  selector: 'add-to-cart-editor', // tslint:disable-line component-selector
  templateUrl: './add-to-cart-editor.component.html',
  styleUrls: ['./add-to-cart-editor.component.scss']
})
export class AddToCartEditorComponent {
  @Input() type: AddToCartType;
  @Input() dropdown: DropdownValue[];
}
