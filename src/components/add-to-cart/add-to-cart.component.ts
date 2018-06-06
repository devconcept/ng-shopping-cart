import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DropdownValue} from '../../interfaces/dropdown-value';
import {AddToCartPosition, AddToCartType} from '../../types';
import {CartService} from '../../services/cart.service';
import {CartItem} from '../../classes/cart-item';

/**
 * A component to add items to the cart by pressing a button. Has different built-in editors to select quantity.
 *
 * @order 1
 * @howToUse "With a custom button or projected content"
 * ```html
 * <add-to-cart [item]="item" [custom]="true">
 *    <button type="button" class="my-custom-class">Add item</button>
 * </add-to-cart>
 * ```
 *
 * @howToUse "With different text and classes"
 * ```html
 * <add-to-cart [item]="item" [buttonText]="'Add item'" [buttonClass]="'my-custom-class'">
 * </add-to-cart>
 * ```
 *
 * @howToUse "With a html number input positioned on top"
 * ```html
 * <add-to-cart [item]="item" [type]="'number'" [position]="'top'">
 * </add-to-cart>
 * ```
 *
 * @howToUse "With a select for selecting quantity"
 * ```html
 * <add-to-cart [item]="item" [type]="'dropdown'" [dropdown]="[{ label: 'One item', value: 1 }, { label: 'Two items', value: 2 }]">
 * </add-to-cart>
 * ```
 *
 * @howToUse "With the default button and different quantity"
 * ```html
 * <add-to-cart [item]="item" [quantity]="5">
 * </add-to-cart>
 * ```
 *
 * @note {warning} This component captures click events that bubble from its projected content if you are using `[custom]=true` therefore if
 * you have html content other than buttons inside you must stop the event propagation unless the click originated in the button that
 * add the items to the cart.
 */
@Component({
  selector: 'add-to-cart', // tslint:disable-line component-selector
  templateUrl: './add-to-cart.component.html',
})
export class AddToCartComponent implements OnInit, OnChanges {
  private _editorQuantity = 1;
  containerClass: any;
  hasEditor = false;
  horizontalEditor = true;
  editorPrecedence: 'before' | 'after' = 'before';
  /**
   * If `false` displays a default button provided by the component, otherwise projects the contents of the component to be used as a
   * button.
   */
  @Input() custom = false;
  /**
   * The item that will be added to the cart on click. If no item is provided the button will be disabled unless you use custom buttons.
   *
   * If you specify an editor using the type input the quantity of the item might be modified prior to insertion in the service.
   */
  @Input() item: CartItem;
  /**
   * Changes the default text of the component's button.
   */
  @Input() buttonText = 'Add to cart';
  /**
   * Changes the default CSS class of the component's button.
   */
  @Input() buttonClass = 'add-to-cart-button';
  /**
   * Renders a button or a button with an editor to select the quantity of the item that will be added in the cart. When it has a value
   * other than `'button'` an editor is displayed depending on the selected `[type]`; it can be a `select`, or a text or a number `input`.
   *
   * > Do not confuse this input with the html attribute `type`. The default button is always generated with this attribute set to
   * `button` to prevent accidental form submissions.
   */
  @Input() type: AddToCartType = 'button';
  /**
   * Sets the position where the editor will be placed. If the `[type]` is set to `'button'` no editor is displayed and this setting has
   * no effect.
   */
  @Input() position: AddToCartPosition = 'left';
  /**
   * If `[type]` is set to `'dropdown'` it can be used to set the options of the rendered `select` editor. Is an array of objects with
   * label and a value properties used to populate the select's `option` elements.
   */
  @Input() dropdown: DropdownValue[] = [
    {label: '1 item', value: 1},
    {label: '2 items', value: 2},
    {label: '5 items', value: 5}
  ];
  /**
   * If you use this binding you can easily override the quantity that will be added to the cart when the button is clicked.
   *
   * > When the `[type]` is **not** set to `'button'` this binding is ignored and the value from the editor is used instead.
   */
  @Input() quantity: number;
  /**
   * This event is fired when the component uses an editor and its value is changed by the user.
   */
  @Output() change = new EventEmitter<number>();
  /**
   * This event is fired when the item is added to the cart.
   */
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

  ngOnInit(): void {
    this.computeClass();
  }

  private itemQuantity(): number {
    if (this.type === 'button') {
      if (this.quantity) {
        return this.quantity;
      }
      return this.item.getQuantity();
    } else {
      return this._editorQuantity;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']) {
      this.hasEditor = changes['type'].currentValue !== 'button';
      if (changes['type'].currentValue === 'dropdown' && this.dropdown.length) {
        const quantity = this.itemQuantity();
        const match = this.dropdown.find(i => i.value === quantity);
        if (!match) {
          this._editorQuantity = this.dropdown[0].value;
        }
      }
    }
    if (changes['position']) {
      const pos = changes['position'].currentValue;
      this.horizontalEditor = pos === 'left' || pos === 'right';
      this.editorPrecedence = pos === 'left' || pos === 'top' ? 'before' : 'after';
    }
    this.computeClass();
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

  computeClass() {
    this.containerClass = [
      'add-to-cart-' + this.type,
      this.horizontalEditor ?
        'editor-position-horizontal' :
        'editor-position-vertical'
    ];
  }

}
