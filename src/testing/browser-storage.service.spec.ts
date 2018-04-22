import { BaseCartItem } from '../classes/base-cart-item';
import { TestCartItem } from '../testing/test-cart-item';
import { CartService } from '../classes/cart.service';


export function browserStorageSuite(browserStorage: any, cartService: any) {
  describe(cartService.name, () => {
    describe('Service configuration', () => {
      const storageKey = 'ServiceStorageConfig';
      beforeAll(() => {
        browserStorage.removeItem(storageKey);
        browserStorage.removeItem('NgShoppingCart');
      });

      it('should initialize the storage key provided as option', () => {
        expect(browserStorage.getItem(storageKey)).toBeNull();
        const service = new cartService(BaseCartItem, { storageKey });
        expect(service['storageKey']).toEqual(storageKey);
      });

      it('should store a reference to the item class provided as option', () => {
        const service = new cartService(TestCartItem, {});
        expect(service['storageKey']).toEqual('NgShoppingCart');
        expect(service['itemClass']).toEqual(TestCartItem);
      });

      afterAll(() => {
        browserStorage.removeItem('ServiceStorageConfig');
        browserStorage.removeItem('NgShoppingCart');
      });
    });

    describe('Service operation', () => {
      const storageKey = 'TestNgCartLocal';
      let service: CartService<BaseCartItem>;

      beforeEach(() => {
        browserStorage.removeItem('TestNgCartLocal');
        service = new cartService(BaseCartItem, { storageKey });
      });

      it('should count items', () => {
        expect(service.itemCount()).toBe(0);
        expect(service.getItems().constructor).toBe(Array);
        expect(service.getItems().length).toBe(0);
        expect(service.isEmpty()).toBe(true);
      });

      it('should add items', () => {
        const item = new BaseCartItem({ id: 1, name: 'Test item', price: 10, photo: '', quantity: 10 });
        service.addItem(item);
        expect(service.itemCount()).toBe(1);
        expect(service.getItems()[0].id).toBe(1);
        expect(service.isEmpty()).toBe(false);
      });

      it('should get items', () => {
        const item = new BaseCartItem({ id: 1, name: 'Test item', price: 10, photo: '', quantity: 10 });
        service.addItem(item);
        expect(service.itemCount()).toBe(1);
      });

      it('should remove items', () => {
        const item = new BaseCartItem({ id: 1, name: 'Test item', price: 10, photo: '', quantity: 10 });
        service.addItem(item);
        expect(service.itemCount()).toBe(1);
        expect(service.isEmpty()).toBe(false);
        service.removeItem(1);
        expect(service.itemCount()).toBe(0);
        expect(service.isEmpty()).toBe(true);
      });

      it('should count single items', () => {
        const item = new BaseCartItem({ id: 1, name: 'Test item', price: 10, photo: '', quantity: 10 });
        service.addItem(item);
        expect(service.entries()).toBe(10);
      });

      it('should compute the items cost', () => {
        const item = new BaseCartItem({ id: 1, name: 'Test item', price: 10, photo: '', quantity: 10 });
        service.addItem(item);
        expect(service.cost()).toBe(100);
      });

      it('should set the tax rate', () => {
        const item = new BaseCartItem({ id: 1, name: 'Test item', price: 10, photo: '', quantity: 10 });
        service.addItem(item);
        service.setTaxRate(20);
        expect(service.getTaxRate()).toEqual(20);
        expect(JSON.parse(browserStorage.getItem(storageKey)).taxRate).toEqual(20);
      });

      it('should set shipping cost', () => {
        const item = new BaseCartItem({ id: 1, name: 'Test item', price: 10, photo: '', quantity: 10 });
        service.addItem(item);
        service.setShipping(10);
        expect(service.getShipping()).toEqual(10);
        expect(JSON.parse(browserStorage.getItem(storageKey)).shipping).toEqual(10);
      });

      afterAll(() => {
        browserStorage.removeItem(storageKey);
      });
    });
  });
}

