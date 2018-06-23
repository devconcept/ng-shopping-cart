import {Component} from '@angular/core';

@Component({
  selector: 'demo-cart-summary',
  templateUrl: './demo-cart-summary.component.html',
})
export class DemoCartSummaryComponent  {
  settingsCollapsed = false;
  resultsCollapsed = false;

  icon = '';
  plurals: any;
  pluralError = false;
  pluralIncomplete = false;

  setPlurals(value) {
    try {
      this.pluralIncomplete = false;
      this.pluralError = false;
      const pl = JSON.parse(value.replace(/['`]/g, '"'));
      if (typeof pl !== 'object') {
        this.pluralError = true;
        return;
      }
      this.pluralIncomplete = !(Object.keys(pl).find(k => !k.startsWith('=')));
      if (this.pluralIncomplete) {
        return;
      }
      this.plurals = pl;
      this.pluralError = false;
    } catch {
      this.pluralError = true;
    }
  }
}
