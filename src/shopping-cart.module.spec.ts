import {ShoppingCartModule} from './shopping-cart.module';
import {SessionStorageCartService} from './services/session-storage-cart.service';
import {CartService} from './classes/cart.service';
import {TestBed} from '@angular/core/testing';
import {CART_ITEM_CLASS} from './services/item-class.token';
import {BaseCartItem} from './classes/base-cart-item';
import {CART_SERVICE_CONFIGURATION} from './services/service-configuration.token';
import {MemoryCartService} from './services/memory-cart.service';
import {LocalStorageCartService} from './services/local-storage-cart.service';
import {TestCartItem} from './testing/test-cart-item';

describe('ShoppingCartModule', () => {
  describe('forRoot', () => {
    it('should provide the module with a memory storage service', () => {
      TestBed
        .configureTestingModule(ShoppingCartModule.forRoot({
          serviceType: 'memory'
        }));
      const service = TestBed.get(CartService);
      const itemClass = TestBed.get(CART_ITEM_CLASS);
      const serviceConfig = TestBed.get(CART_SERVICE_CONFIGURATION);
      expect(service instanceof MemoryCartService).toEqual(true);
      expect(itemClass).toEqual(BaseCartItem);
      expect(serviceConfig).toBeNull();
    });

    it('should allow to change the itemClass configuration', () => {
      TestBed
        .configureTestingModule(ShoppingCartModule.forRoot({
          itemType: TestCartItem
        }));
      const itemClass = TestBed.get(CART_ITEM_CLASS);
      expect(itemClass).toEqual(TestCartItem);
    });

    it('should provide the module with a session storage service', () => {
      TestBed
        .configureTestingModule(ShoppingCartModule.forRoot({
          serviceType: 'sessionStorage'
        }));
      const service = TestBed.get(CartService);
      const itemClass = TestBed.get(CART_ITEM_CLASS);
      const serviceConfig = TestBed.get(CART_SERVICE_CONFIGURATION);
      expect(service instanceof SessionStorageCartService).toEqual(true);
      expect(itemClass).toEqual(BaseCartItem);
      expect(serviceConfig).toBeTruthy();
      expect(serviceConfig.storageKey).toEqual('NgShoppingCart');
      expect(serviceConfig.clearOnError).toBeTruthy();
    });

    it('should provide the module with a local storage service', () => {
      TestBed
        .configureTestingModule(ShoppingCartModule.forRoot({
          serviceType: 'localStorage'
        }));
      const service = TestBed.get(CartService);
      const itemClass = TestBed.get(CART_ITEM_CLASS);
      const serviceConfig = TestBed.get(CART_SERVICE_CONFIGURATION);
      expect(service instanceof LocalStorageCartService).toEqual(true);
      expect(itemClass).toEqual(BaseCartItem);
      expect(serviceConfig.storageKey).toEqual('NgShoppingCart');
      expect(serviceConfig.clearOnError).toBeTruthy();
    });

    it('should allow to change the service configuration', () => {
      TestBed
        .configureTestingModule(ShoppingCartModule.forRoot({
          serviceType: 'localStorage',
          serviceOptions: {clearOnError: false, storageKey: 'TestKey'}
        }));
      const service = TestBed.get(CartService);
      const itemClass = TestBed.get(CART_ITEM_CLASS);
      const serviceConfig = TestBed.get(CART_SERVICE_CONFIGURATION);
      expect(service instanceof LocalStorageCartService).toEqual(true);
      expect(itemClass).toEqual(BaseCartItem);
      expect(serviceConfig.storageKey).toEqual('TestKey');
      expect(serviceConfig.clearOnError).toBeFalsy();
    });
  });

  describe('forChild', () => {
    it('should provide a forChild static method for feature modules', () => {
      TestBed
        .configureTestingModule(ShoppingCartModule.forChild());

      [CartService, CART_ITEM_CLASS, CART_SERVICE_CONFIGURATION]
        .map(prov => {
          return function () {
            TestBed.get(prov);
          };
        })
        .forEach(fn => expect(fn).toThrowError(/^StaticInjectorError/));
    });
  });
});
