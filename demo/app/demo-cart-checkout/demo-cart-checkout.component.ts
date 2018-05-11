import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'demo-cart-checkout',
  templateUrl: './demo-cart-checkout.component.html',
  styleUrls: ['./demo-cart-checkout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DemoCheckoutComponent  {
  custom = false;
  label = 'Checkout';
  settingsCollapsed = false;
  resultsCollapsed = false;
}
