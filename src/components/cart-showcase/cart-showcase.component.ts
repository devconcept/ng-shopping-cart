import {Component, Injector, Input, NgModuleFactory, OnChanges, OnDestroy, OnInit, SimpleChanges, Type} from '@angular/core';
import {CartItem} from '../../classes/cart-item';
import {CartShowcaseItemComponent} from '../../components/cart-showcase-item/cart-showcase-item.component';
import {ShowcaseItem} from '../../interfaces/showcase-item';
import {CartService} from '../../services/cart.service';

/**
 * Renders items arranged in columns using a dynamic component for the item. Useful for getting started with e-commerce applications.
 *
 * @order 4
 * @howToUse "Using wider items"
 * ```html
 * <cart-showcase [items]="items" [aspectRatio]="'2:1'">
 * </cart-showcase>
 * ```
 *
 * @howToUse "Using four columns in all screen sizes bigger than 768px"
 * ```html
 * <cart-showcase [items]="items" [mCols]="4" [lCols]="4">
 * </cart-showcase>
 * ```
 *
 * @howToUse "Using a different item component"
 * ```html
 * <!-- my-component.html -->
 * <cart-showcase [items]="items" [itemComponent]="itemComponent">
 * </cart-showcase>
 * ```
 * ```typescript
 * // my-component.ts
 * export class MyComponent {
 *   itemComponent = MyCustomItemComponent;
 * }
 *
 * // my-custom-item-component.ts
 * @Component({
 *  selector: 'my-custom-item-component',
 *  template: '<div class="item-class">{{item.getName()}}</div>'
 * })
 * export class MyCustomItemComponent implements ShowcaseItem  {
 *   item: CartItem;
 * }
 *
 * // app.module.ts
 * @NgModule({
 *   // .....
 *   entryComponents: [MyCustomItemComponent],
 * })
 * export class AppModule {
 * }
 * ```
 *
 * @note {warning} If you change the `[columns]` input you must also change the sass variable that controls the component grid and
 * vice-versa. A similar procedure is required to create aspect ratios with values greater than four eg: `'1:5'`. Check the styling guide
 * for more information.
 *
 * @note {danger} The aspect ratio is the width/height proportion of the items therefore a ratio of `'2:2'` is equivalent to `'1:1'`.
 * Redundant ratios like these are removed from the source so don't try to use them.
 *
 */
@Component({
  selector: 'cart-showcase',
  templateUrl: './cart-showcase.component.html',
})
export class CartShowcaseComponent implements OnChanges, OnInit, OnDestroy {
  private _serviceSubscription: any;
  format: string;
  xsClass = 'sc-container-xs-12';
  sClass = 'sc-container-s-6';
  mClass = 'sc-container-m-4';
  lClass = 'sc-container-l-4';
  xlClass = 'sc-container-xl-3';
  ratioClass = 'sc-ratio-1-1';
  /**
   * The number of columns to display when the screen size matches phone devices.
   */
  @Input() xsCols = 1;
  /**
   * The number of columns to display when the screen matches tablet devices.
   */
  @Input() sCols = 2;
  /**
   * The number of columns to display when the screen matches desktop devices.
   */
  @Input() mCols = 3;
  /**
   * The number of columns to display when the screen matches large desktop devices.
   */
  @Input() lCols = 3;
  /**
   * The number of columns to display when the screen matches extra large desktop devices.
   */
  @Input() xlCols = 4;
  /**
   * The number of columns in the grid.
   * Only update this value if you changed the columns sass variable in the library styles following the Styling guide.
   */
  @Input() columns = 12;
  /**
   * An array of items to display
   */
  @Input() items: CartItem[];
  /**
   * The component to render for each item. This type means any component that implements the interface `ShowcaseItem`.
   */
  @Input() itemComponent: Type<ShowcaseItem> = CartShowcaseItemComponent;
  /**
   * Optional injector for the dynamic item components. Used when you want to replace the default inherited injector for the component.
   */
  @Input() injector: Injector;
  /**
   * Optional module factory for the dynamic components. You usually get one when you manually compile modules.
   */
  @Input() moduleFactory: NgModuleFactory<any>;
  /**
   * The aspect ratio of the container of the items. A value of `1:1` means square items, `2:1` means two times wider, `1:2` two times
   * taller and so on.
   */
  @Input() aspectRatio = '1:1';
  /**
   * Changes currency display format for the component. Overrides the value set from the service using `setLocaleFormat`.
   */
  @Input() localeFormat: string;

  private getColumnSize(value) {
    return Math.floor(this.columns / value);
  }

  constructor(private cartService: CartService<any>) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    const columnProps = ['xsCols', 'sCols', 'mCols', 'lCols', 'xlCols'];
    const classPrefix = ['xs', 's', 'm', 'l', 'xl'];
    for (let i = 0; i < columnProps.length; i++) {
      const prop = columnProps[i];
      const colChanges = changes[prop];
      if (changes['columns'] || colChanges) {
        const prefix = classPrefix[i];
        const size = this.getColumnSize(this[prop]);
        this[`${prefix}Class`] = `sc-container-${prefix}-${size}`;
      }
    }
    if (changes['aspectRatio']) {
      const newRatio = changes['aspectRatio'].currentValue;
      const values = newRatio.split(':');
      if (values.length === 2) {
        this.ratioClass = `sc-ratio-${values[0]}-${values[1]}`;
      }
    }
    if (changes['localeFormat']) {
      this.format = this.localeFormat || <string>this.cartService.getLocaleFormat();
    }
  }

  ngOnInit(): void {
    this.format = this.localeFormat || <string>this.cartService.getLocaleFormat();
    this._serviceSubscription = this.cartService.onChange.subscribe((evt) => {
      if (evt.change === 'format' && !this.localeFormat) {
        this.format = <string>this.cartService.getLocaleFormat();
      }
    });
  }

  ngOnDestroy(): void {
    this._serviceSubscription.unsubscribe();
  }
}
