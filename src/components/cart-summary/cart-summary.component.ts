import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CartService } from '../../classes/cart.service';

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
 */
@Component({
  selector: 'cart-summary',
  templateUrl: './cart-summary.component.html',
})
export class CartSummaryComponent implements OnInit, OnDestroy {
  private cartSubscription: any;
  /**
   * The url of an icon to show on the summary. Use this to replace the default icon which is an svg with the image of a shopping cart.
   */
  @Input() icon: string;
  /**
   * The component uses the i18nPlural pipe to translate the number of items of the cart according to locale rules using the ICU format.
   * You can use this binding to internationalize you app or to change how values are converted into words.
   */
  @Input() totalPlurals: { [k: string]: string } = { '=0': 'No items', '=1': 'One item', 'other': '# items' };
  totalItems = 0;
  totalCost = 0;

  constructor(private cartService: CartService<any>) {

  }

  private updateComponent() {
    this.totalItems = this.cartService.itemCount();
    this.totalCost = this.cartService.totalCost();
  }

  ngOnInit(): void {
    this.updateComponent();
    this.cartSubscription = this.cartService.onItemsChanged.subscribe(() => {
      this.updateComponent();
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
    this.cartSubscription = null;
  }

}
