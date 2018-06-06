import {Component} from '@angular/core';
import {AddToCartType, AddToCartPosition} from '../../../src/types';
import {CartService} from '../../../src/services/cart.service';
import {DemoCartItem} from '../demo-cart-item';

@Component({
  selector: 'demo-add-to-cart',
  templateUrl: './demo-add-to-cart.component.html',
  styleUrls: ['./demo-add-to-cart.component.scss']
})
export class DemoAddToCartComponent {
  private _itemName: string;
  private _itemImage: string;
  private _itemQuantity: number;
  private _itemPrice: number;

  cartItem: DemoCartItem;
  backupItem: DemoCartItem;
  currentKey = 'cartItem';
  quantity = 1;
  custom = false;
  label = 'Add to cart';
  editor = 'button';
  editorTypes: AddToCartType[] = ['button', 'text', 'number', 'dropdown'];
  position = 'left';
  positions: AddToCartPosition[] = ['left', 'right', 'top', 'bottom'];
  customTypes = [{name: 'True', value: true}, {name: 'False', value: false}];
  editorCollapsed = true;
  settingsCollapsed = false;
  resultsCollapsed = false;

  get itemName(): string {
    return this._itemName;
  }

  set itemName(value: string) {
    this._itemName = value;
    this[this.currentKey].label = value;
    this.checkValues();
  }

  get itemImage(): string {
    return this._itemImage;
  }

  set itemImage(value: string) {
    this._itemImage = value;
    this[this.currentKey].photo = value;
    this.checkValues();
  }

  get itemQuantity(): number {
    return this._itemQuantity;
  }

  set itemQuantity(value: number) {
    this._itemQuantity = value;
    this[this.currentKey].amount = value;
    this.checkValues();
  }

  get itemPrice(): number {
    return this._itemPrice;
  }

  set itemPrice(value: number) {
    this._itemPrice = value;
    this[this.currentKey].cost = value;
    this.checkValues();
  }

  constructor(private cartService: CartService<DemoCartItem>) {
    this.createItem();
  }

  createItem() {
    this.currentKey = 'cartItem';
    this.cartItem = new DemoCartItem({
      identifier: Date.now(),
      description: 'Test description',
      country: 'US'
    });
    this.itemName = 'Test';
    this.itemPrice = 14.5;
    this.itemQuantity = 1;
    this.itemImage = 'https://picsum.photos/400?random';
  }

  checkValues() {
    if (!this.backupItem && (!this.itemImage || !this.itemQuantity || !this.itemPrice || !this.itemName)) {
      this.currentKey = 'backupItem';
      this.backupItem = this.cartItem;
      this.cartItem = null;
    }
    if (this.backupItem && this.itemImage && this.itemQuantity && this.itemPrice && this.itemName) {
      this.currentKey = 'cartItem';
      this.cartItem = this.backupItem;
      this.backupItem = null;
    }
  }

  addToCart(item) {
    console.log('added', item);
    console.log('cart items', this.cartService.getItems());
    this.createItem();
  }

  quantityChanged(value) {
    console.log('editor changed', value);
  }
}
