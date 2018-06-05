import {AppPage} from './app.po';

describe('NgShoppingCart demo', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display one demo element for component', () => {
    page.navigateTo();
    return page.getDemoElements().then(el => {
      expect(el.length).toEqual(5);
    });
  });
});
