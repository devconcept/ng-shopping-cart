import {Component} from '@angular/core';

@Component({
  selector: 'demo-cart-summary',
  templateUrl: './demo-cart-summary.component.html',
})
export class DemoCartSummaryComponent  {
  settingsCollapsed = false;
  resultsCollapsed = false;

  icon = '';
  noItemsText = 'No items';
  oneItemText = 'One item';
  manyItemsText = '# items';
}
