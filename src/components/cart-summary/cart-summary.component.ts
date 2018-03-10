import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'cart-summary',
  templateUrl: './cart-summary.component.html',
})
export class CartSummaryComponent implements OnInit, OnDestroy {
  private cartSubscription: any;
  totalItems = 0;
  totalCost = 0;
  itemMapping: { [k: string]: string } = { '=0': 'No items', '=1': 'One item', 'other': '# items' };

  constructor(private cartService: CartService<any>) {

  }

  private updateComponent() {
    this.totalItems = this.cartService.getItems().length;
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
