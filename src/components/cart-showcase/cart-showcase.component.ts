import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CartItem } from '../../classes/cart-item';
import { CartShowcaseItemComponent } from '../../components/cart-showcase-item/cart-showcase-item.component';
import { ShowcaseBreakpointGroup } from '../../interfaces/showcase-breakpoint-group';

@Component({
  selector: 'cart-showcase',
  templateUrl: './cart-showcase.component.html',
})
export class CartShowcaseComponent implements OnChanges {
  private columnDefaults: ShowcaseBreakpointGroup = {
    'extra-small': 1,
    'small': 2,
    'medium': 3,
    'large': 3,
    'extra-large': 4,
  };
  xsClass = 'showcase-container-xs-12';
  smClass = 'showcase-container-s-6';
  mdClass = 'showcase-container-m-4';
  lgClass = 'showcase-container-l-4';
  xlClass = 'showcase-container-xl-3';
  @Input() items: CartItem[];
  @Input() itemComponent: any = CartShowcaseItemComponent;
  @Input() columns: number | ShowcaseBreakpointGroup = 4;

  private getColumnSize(value) {
    return Math.floor(12 / value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const columnsChange = changes['columns'];
    if (columnsChange) {
      if (typeof columnsChange.currentValue === 'number') {
        const columnsValue = columnsChange.currentValue;
        if (columnsValue < 0 || columnsValue > 12) {
          throw new Error('Columns must be a value between 1 and 12');
        }
        const value = this.getColumnSize(columnsValue);
        this.xsClass = `showcase-container-xs-${value}`;
        this.smClass = `showcase-container-s-${value}`;
        this.mdClass = `showcase-container-m-${value}`;
        this.lgClass = `showcase-container-l-${value}`;
        this.xlClass = `showcase-container-xl-${value}`;
      } else {
        const columns = { ...this.columnDefaults, ...columnsChange.currentValue};

        this.xsClass = `showcase-container-xs-${this.getColumnSize(columns['extra-small'])}`;
        this.smClass = `showcase-container-s-${this.getColumnSize(columns['small'])}`;
        this.mdClass = `showcase-container-m-${this.getColumnSize(columns['medium'])}`;
        this.lgClass = `showcase-container-l-${this.getColumnSize(columns['large'])}`;
        this.xlClass = `showcase-container-xl-${this.getColumnSize(columns['extra-large'])}`;
      }
    }
  }
}
