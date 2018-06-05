import { browser, $$ } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getDemoElements() {
    return $$('demo-root .container .demo-section');
  }
}
