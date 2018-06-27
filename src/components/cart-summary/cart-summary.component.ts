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
 * <cart-summary [totalPlurals]="summaryPlurals"></cart-summary>
 * ```
 * ```typescript
 * export class MyComponent {
 *   summaryPlurals = {'=0': 'Empty cart', '=2': 'A couple of items', '=12': 'A dozen items', 'other': '# items'}
 * }
 * ```
 *
 * @note {warning} The component display a total cost of `0` until you add items to the cart.
 */
@Component({
  selector: 'cart-summary',
  templateUrl: './cart-summary.component.html',
})
export class CartSummaryComponent implements OnInit, OnChanges, OnDestroy {
  private _cartChangeSubscription: any;
  private _defaultPlurals: { [k: string]: string } = {'=0': 'No items', '=1': 'One item', 'other': '# items'};
  public summaryPlurals: { [k: string]: string };
  /**
   * The url of an icon to show on the summary. Use this to replace the default icon which is an svg with the image of a shopping cart.
   *
   * To use the default icon when you are using the `[icon]` input just set it to a falsy value, eg: `null`, `undefined`, `''`, etc
   */
  @Input() icon: string;
  /**
   * The component uses the i18nPlural pipe to translate the number of items of the cart according to locale rules using the ICU format.
   *
   * You can use this binding to internationalize you app or to change how values are converted into words.
   */
  @Input() totalPlurals: { [k: string]: string };
  /**
   * Changes currency display format for the component. Overrides the value set from the service using `setCurrencyFormat`.
   */
  @Input() localeFormat: string;
  totalItems = 0;
  totalCost = 0;
  format: LocaleFormat;

  constructor(private cartService: CartService<any>) {

  }

  private updateComponent() {
    this.totalItems = this.cartService.itemCount();
    this.totalCost = !this.cartService.isEmpty() ? this.cartService.totalCost() : 0;
    if (!this.localeFormat) {
      this.format = <LocaleFormat>this.cartService.getLocaleFormat(true);
    }
  }

  ngOnInit(): void {
    this.updateComponent();
    this._cartChangeSubscription = this.cartService.onChange.subscribe(() => {
      this.updateComponent();
    });
    if (!this.summaryPlurals) {
      this.summaryPlurals = this._defaultPlurals;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalPlurals']) {
      const value = changes['totalPlurals'].currentValue;
      this.summaryPlurals = value || this._defaultPlurals;
    }
    if (changes['localeFormat']) {
      this.format = this.localeFormat ?
        parseLocaleFormat(this.localeFormat) :
        <LocaleFormat>this.cartService.getLocaleFormat(true);
    }
  }

  ngOnDestroy(): void {
    this._cartChangeSubscription.unsubscribe();
  }
}
