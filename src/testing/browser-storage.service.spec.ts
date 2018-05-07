import {BaseCartItem} from '../classes/base-cart-item';
import {TestCartItem} from '../testing/test-cart-item';
import {CartService} from '../classes/cart.service';

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
        const service = new cartService(BaseCartItem, {storageKey});
        expect(service['storageKey']).toEqual(storageKey);
      });

      it('should initialize remember the option to clear on errors', () => {
        let service = new cartService(BaseCartItem);
        expect(service['clearOnError']).toEqual(true);
        service = new cartService(BaseCartItem, {clearOnError: false});
        expect(service['clearOnError']).toEqual(false);
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
        service = new cartService(BaseCartItem, {storageKey});
      });

      it('should count items', () => {
        expect(service.itemCount()).toBe(0);
        expect(service.getItems().constructor).toBe(Array);
        expect(service.getItems().length).toBe(0);
        expect(service.isEmpty()).toBe(true);
      });

      it('should add items', () => {
        const item = new BaseCartItem({id: 1, name: 'Test item', price: 10, photo: '', quantity: 10});
        service.addItem(item);
        expect(service.itemCount()).toBe(1);
        expect(service.getItems()[0].id).toBe(1);
        expect(service.isEmpty()).toBe(false);
      });

      it('should get items', () => {
        const item = new BaseCartItem({id: 1, name: 'Test item', price: 10, photo: '', quantity: 10});
        service.addItem(item);
        expect(service.itemCount()).toBe(1);
      });

      it('should remove items', () => {
        const item = new BaseCartItem({id: 1, name: 'Test item', price: 10, photo: '', quantity: 10});
        service.addItem(item);
        expect(service.itemCount()).toBe(1);
        expect(service.isEmpty()).toBe(false);
        service.removeItem(1);
        expect(service.itemCount()).toBe(0);
        expect(service.isEmpty()).toBe(true);
      });

      it('should count single items', () => {
        const item = new BaseCartItem({id: 1, name: 'Test item', price: 10, photo: '', quantity: 10});
        service.addItem(item);
        expect(service.entries()).toBe(10);
      });

      it('should compute the items cost', () => {
        const item = new BaseCartItem({id: 1, name: 'Test item', price: 10, photo: '', quantity: 10});
        service.addItem(item);
        expect(service.cost()).toBe(100);
      });

      it('should set the tax rate', () => {
        const item = new BaseCartItem({id: 1, name: 'Test item', price: 10, photo: '', quantity: 10});
        service.addItem(item);
        service.setTaxRate(20);
        expect(service.getTaxRate()).toEqual(20);
        expect(JSON.parse(browserStorage.getItem(storageKey)).taxRate).toEqual(20);
      });

      it('should set shipping cost', () => {
        const item = new BaseCartItem({id: 1, name: 'Test item', price: 10, photo: '', quantity: 10});
        service.addItem(item);
        service.setShipping(10);
        expect(service.getShipping()).toEqual(10);
        expect(JSON.parse(browserStorage.getItem(storageKey)).shipping).toEqual(10);
      });

      afterAll(() => {
        browserStorage.removeItem(storageKey);
      });
    });

    describe('Serialization', () => {
      describe('Default items', () => {
        const storageKey = 'TestNgCartLocal';
        let service: CartService<BaseCartItem>;

        beforeEach(() => {
          browserStorage.removeItem(storageKey);
          service = new cartService(BaseCartItem, {storageKey});
        });

        it('should be able to save and restore classes with the constructor', () => {
          const item = new BaseCartItem({id: 1, name: 'Test item', price: 10, quantity: 5, image: ''});
          service.addItem(item);
          const contents = JSON.parse(browserStorage.getItem(storageKey));
          expect(contents.items).toBeTruthy();
          expect(contents.items.length).toEqual(1);
          const otherService = new cartService(BaseCartItem, {storageKey});
          const otherItem = otherService.getItem(1);
          expect(otherItem).toBeTruthy();
          expect(otherItem.getId()).toEqual(1);
          expect(otherItem.getName()).toEqual('Test item');
          expect(otherItem.getPrice()).toEqual(10);
          expect(otherItem.getQuantity()).toEqual(5);
          expect(otherItem.getImage()).toEqual('');
        });

        afterAll(() => {
          browserStorage.removeItem(storageKey);
        });
      });

      describe('Error parsing', () => {
        const storageKey = 'TestNgCartLocal';
        let service: CartService<BaseCartItem>;

        beforeEach(() => {
          browserStorage.removeItem(storageKey);
        });

        it('should throw an error if the stored info is not a valid cart object', () => {
          browserStorage.setItem(storageKey, '[]');
          const testErrorFn = () => {
            service = new cartService(BaseCartItem, {storageKey, clearOnError: false});
          };
          expect(testErrorFn).toThrowError(`The object found under the key ${storageKey} is not a valid cart object`);
        });

        it('should throw an error if the stored info is not a valid JSON', () => {
          browserStorage.setItem(storageKey, 'bla');
          const testErrorFn = () => {
            service = new cartService(BaseCartItem, {storageKey, clearOnError: false});
          };
          expect(testErrorFn).toThrowError(/^Unexpected token/);
        });

        it('should not throw an error if an invalid cart is stored but clear on error is true', () => {
          browserStorage.setItem(storageKey, '[]');
          const testClearFn = () => {
            service = new cartService(BaseCartItem, {storageKey});
          };
          expect(testClearFn).not.toThrow();
          const storedValue = browserStorage.getItem(storageKey);
          expect(storedValue).toBeTruthy();
          expect(storedValue).toMatch(/"items":\[]/);
          expect(storedValue).toMatch(/"shipping":0/);
          expect(storedValue).toMatch(/"taxRate":0/);
        });

        afterAll(() => {
          browserStorage.removeItem(storageKey);
        });
      });

      describe('Custom items', () => {
        const storageKey = 'TestNgCartLocal';
        let service: CartService<TestCartItem>;

        beforeEach(() => {
          browserStorage.removeItem('TestNgCartLocal');
          service = new cartService(TestCartItem, {storageKey});
        });

        it('should be able to save and restore classes with the fromJSON method', () => {
          const item = new TestCartItem(1, 'Test item', 10, 5, '');
          service.addItem(item);
          const contents = JSON.parse(browserStorage.getItem(storageKey));
          expect(contents.items).toBeTruthy();
          expect(contents.items.length).toEqual(1);
          const otherService = new cartService(TestCartItem, {storageKey});
          const otherItem = otherService.getItem(1);
          expect(otherItem).toBeTruthy();
          expect(otherItem.getId()).toEqual(1);
          expect(otherItem.getName()).toEqual('Test item');
          expect(otherItem.getPrice()).toEqual(10);
          expect(otherItem.getQuantity()).toEqual(5);
          expect(otherItem.getImage()).toEqual('');
        });

        afterAll(() => {
          browserStorage.removeItem(storageKey);
        });
      });
    });
  });
}

