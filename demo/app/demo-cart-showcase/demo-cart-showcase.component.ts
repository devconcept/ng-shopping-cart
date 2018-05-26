import {Component, Type} from '@angular/core';
import {CartItem} from '../../../src/classes/cart-item';
import {CartShowcaseItemComponent} from '../../../src/components/cart-showcase-item/cart-showcase-item.component';
import {ShowcaseItem} from '../../../src/interfaces/showcase-item';
import {DemoShowcaseItemComponent} from '../demo-showcase-item-component/demo-showcase-item.component';
import {DemoCartItem} from '../demo-cart-item';

@Component({
  selector: 'demo-cart-showcase',
  templateUrl: './demo-cart-showcase.component.html',
})
export class CartShowcaseDemoComponent {
  private _itemType = 'default';
  itemComponent: Type<ShowcaseItem> = CartShowcaseItemComponent;
  item = {label: '', cost: 1, photo: '', amount: 1};
  lastItemId = 1;
  ratios: string[] = [];
  columns: number[] = [1, 2, 3, 4, 6];
  xsCols = 1;
  sCols = 2;
  mCols = 3;
  lCols = 3;
  xlCols = 4;
  aspectRatio = '1:1';

  items: CartItem[] = [
    new DemoCartItem({
      identifier: 1,
      label: 'Item1',
      cost: 10,
      photo: 'assets/laptop.jpg',
      amount: 1
    }),
  ];
  editorCollapsed = true;
  settingsCollapsed = false;
  resultsCollapsed = false;

  get itemType(): string {
    return this._itemType;
  }

  set itemType(value: string) {
    this._itemType = value;
    this.itemComponent = value === 'default'
      ? CartShowcaseItemComponent
      : DemoShowcaseItemComponent;
  }

  constructor() {
    const used = [];
    for (let i = 1; i <= 4; i++) {
      for (let j = 1; j <= 4; j++) {
        const ratio = i / j;
        if (used.indexOf(ratio) === -1) {
          used.push(ratio);
          this.ratios.push(`${i}:${j}`);
        }
      }
    }
  }

  addItem() {
    this.lastItemId++;
    const photo = this.item.photo || 'http://sampleimageurl';
    const {label, amount, cost} = this.item;
    const toAdd = new DemoCartItem({
      identifier: this.lastItemId,
      label,
      amount,
      cost,
      photo,
    });
    this.items.push(toAdd);
  }

}
