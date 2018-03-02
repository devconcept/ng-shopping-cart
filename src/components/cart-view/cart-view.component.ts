import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CartItem } from '../../classes/cart-item';
import { CartService } from '../../services/cart.service';
import { CartViewDisplay } from '../../types';

@Component({
  selector: 'cart-view',
  templateUrl: './cart-view.component.html',
})
export class CartViewComponent implements OnInit, OnDestroy {
  private serviceSubscription: any;
  items: CartItem[];
  @Input() display: CartViewDisplay = 'fixed';

  constructor(private cartService: CartService) {

  }

  ngOnInit(): void {
    this.serviceSubscription = this.cartService.onItemsChanged.subscribe(() => {
      this.items = this.cartService.getItems();
    });
  }

  ngOnDestroy(): void {
    this.serviceSubscription.unsubscribe();
  }

}
