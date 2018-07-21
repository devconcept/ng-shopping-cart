import {Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {LocaleFormat} from '../../interfaces/locale-format';
import {parseLocaleFormat} from '../../locales';

/**
 * Renders a summary of the contents of the cart.
 *
 * @order 3
 * @howToUse "With a different icon"
 * ```html
 * <cart-summary [icon]="'http://myapi/assets/icon.svg'"></cart-summary>
 * ```
 *
 * @howToUse "Display different words when the cart changes"
 * ```html
 * <cart-summary [noItemsText]="'Zero items'" [oneItemText]="'Single item'" [manyItemsText]="'Exactly # items'"></cart-summary>
 * ```
 *
 * @howToUse "Using always a number to display item count"
 * ```html
 * <cart-summary [noItemsText]="'# items'" [oneItemText]="'# items'" [manyItemsText]="'# items'"></cart-summary>
 * ```
 *
 * @note {info} Inputs that allows you to customize text also accept the special character `#` to use numbers instead of words to
 * specify quantity, for example `'# bla'` will update to `'0 bla'` or `'1 bla'` when the number of items in the cart change.
 */
@Component({
  selector: 'cart-summary',
  templateUrl: './cart-summary.component.html',
})
export class CartSummaryComponent implements OnInit, OnChanges, OnDestroy {
  private _serviceSubscription: any;
  /**
   * The url of an icon to show on the summary. Use this to replace the default icon which is an svg with the image of a shopping cart.
   *
   * To use the default icon when you are using the `[icon]` input just set it to a falsy value, eg: `null`, `undefined`, `''`, etc.
   */
  @Input() icon: string;
  /**
   * The text to display when there are no items in the cart.
   */
  @Input() noItemsText = 'No items';
  /**
   * The text to display when there is only one item in the cart.
   */
  @Input() oneItemText = 'One item';
  /**
   * The text to display when there are several items in the cart.
   */
  @Input() manyItemsText = '# items';
  /**
   * Changes currency display format for the component. Overrides the value set from the service using `setCurrencyFormat`.
   */
  @Input() localeFormat: string;
  itemsText;
  totalItems = 0;
  totalCost = 0;
  format: LocaleFormat;

  constructor(private cartService: CartService<any>) {

  }

  private updateItemsText() {
    let text = this.noItemsText;
    if (this.totalItems > 0) {
      text = this.totalItems === 1 ? this.oneItemText : this.manyItemsText;
    }
    this.itemsText = text.replace('#', this.totalItems.toString());
  }

  private updateComponent() {
    this.totalItems = this.cartService.itemCount();
    this.totalCost = !this.cartService.isEmpty() ? this.cartService.totalCost() : 0;
    if (!this.localeFormat) {
      this.format = <LocaleFormat>this.cartService.getLocaleFormat(true);
    }
    this.updateItemsText();
  }

  ngOnInit(): void {
    this.updateComponent();
    this._serviceSubscription = this.cartService.onChange.subscribe(() => {
      this.updateComponent();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['localeFormat']) {
      this.format = this.localeFormat ?
        parseLocaleFormat(this.localeFormat) :
        <LocaleFormat>this.cartService.getLocaleFormat(true);
    }
    if (changes['noItemsText'] || changes['oneItemText'] || changes['manyItemsText']) {
      this.updateItemsText();
    }
  }

  ngOnDestroy(): void {
    this._serviceSubscription.unsubscribe();
  }
}
