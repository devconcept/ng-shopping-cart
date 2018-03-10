import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CartItem } from '../../classes/cart-item';
import { CartShowcaseItemComponent } from '../../components/cart-showcase-item/cart-showcase-item.component';
import { ShowcaseAspectRatio } from '../../types';

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
  @Input() columnsExtraSmall = 1;
  @Input() columnsSmall = 2;
  @Input() columnsMedium = 3;
  @Input() columnsLarge = 3;
  @Input() columnsExtraLarge = 4;
  @Input() items: CartItem[];
  @Input() itemComponent: any = CartShowcaseItemComponent;
  @Input() aspectRatio: ShowcaseAspectRatio = '1:1';

  private getColumnSize(value) {
    return Math.floor(12 / value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const columnProps = ['columnsExtraSmall', 'columnsSmall', 'columnsMedium', 'columnsLarge', 'columnsExtraLarge'];
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
