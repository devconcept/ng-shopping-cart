import { AppPage } from './app.po';

describe('ng-shopping-cart App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getHeaderText()).toEqual('NgShoppingCart Demo');
  });
});
