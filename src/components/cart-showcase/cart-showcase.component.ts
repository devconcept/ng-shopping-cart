import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CartItem } from '../../classes/cart-item';
import { CartShowcaseItemComponent } from '../../components/cart-showcase-item/cart-showcase-item.component';
import { ShowcaseItem } from '../../interfaces/showcase-item';

/**
 * Renders items arranged in columns using a dynamic component for the item useful for getting started with e-commerce applications.
 */
@Component({
  selector: 'cart-showcase',
  templateUrl: './cart-showcase.component.html',
})
export class CartShowcaseComponent implements OnChanges {
  xsClass = 'showcase-container-xs-12';
  sClass = 'showcase-container-s-6';
  mClass = 'showcase-container-m-4';
  lClass = 'showcase-container-l-4';
  xlClass = 'showcase-container-xl-3';
  ratioClass = 'showcase-ratio-1-1';
  /**
   * The number of columns to display when the screen size matches phone devices.
   * @type {number}
   */
  @Input() xsCols = 1;
  /**
   * The number of columns to display when the screen matches tablet devices.
   * @type {number}
   */
  @Input() sCols = 2;
  /**
   * The number of columns to display when the screen matches desktop devices.
   * @type {number}
   */
  @Input() mCols = 3;
  /**
   * The number of columns to display when the screen matches large desktop devices.
   * @type {number}
   */
  @Input() lCols = 3;
  /**
   * The number of columns to display when the screen matches extra large desktop devices.
   * @type {number}
   */
  @Input() xlCols = 4;
  /**
   * The number of columns in the grid
   * @type {number}
   */
  @Input() columns = 12;
  /**
   * An array of items to display
   * @type {CartItem[]}
   */
  @Input() items: CartItem[];
  /**
   * The component to use to display the items
   * @type {ShowcaseItem}
   */
  @Input() itemComponent: any = CartShowcaseItemComponent;
  /**
   * The aspect ratio of the container of the items
   * @type {string}
   */
  @Input() aspectRatio = '1:1';

  private getColumnSize(value) {
    return Math.floor(this.columns / value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const columnProps = ['xsCols', 'sCols', 'mCols', 'lCols', 'xlCols'];
    const classPrefix = ['xs', 's', 'm', 'l', 'xl'];
    for (let i = 0; i < columnProps.length; i ++) {
      const colChanges = changes[columnProps[i]];
      if (colChanges) {
        this[`${classPrefix[i]}Class`] = `showcase-container-xs-${this.getColumnSize(colChanges.currentValue)}`;
      }
    }
    if (changes['aspectRatio']) {
      const newRatio = changes['aspectRatio'].currentValue;
      const values = newRatio.split(':');
      this.ratioClass = `showcase-ratio-${values[0]}-${values[1]}`;
    }
  }
}
