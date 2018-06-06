import {LocalStorageCartService} from './services/local-storage-cart.service';
import {MemoryCartService} from './services/memory-cart.service';
import {CartItem} from './classes/cart-item';
import {SessionStorageCartService} from './services/session-storage-cart.service';
import {BaseCartItem} from './classes/base-cart-item';
import {Provider} from '@angular/core';
import {CART_ITEM_CLASS} from './services/item-class.token';
import {CART_SERVICE_TYPE} from './services/service-type.token';
import {CART_SERVICE_CONFIGURATION} from './services/service-configuration.token';
import {CartService} from './services/cart.service';

export function serviceFactory<T extends CartItem>(serviceType, itemClass, configuration): CartService<T> {
  switch (serviceType) {
    case 'localStorage':
      return new LocalStorageCartService<T>(itemClass, configuration);
    case 'sessionStorage':
      return new SessionStorageCartService<T>(itemClass, configuration);
    default:
      return new MemoryCartService<T>();
  }
}

export function setupService(serviceType): Provider {
  return {
    provide: CART_SERVICE_TYPE,
    useValue: serviceType || 'localStorage'
  };
}

export function setItemClass(itemClass): Provider {
  return {
    provide: CART_ITEM_CLASS,
    useValue: itemClass || BaseCartItem
  };
}

export function setServiceConfiguration(serviceType, serviceOptions): Provider {
  return {
    provide: CART_SERVICE_CONFIGURATION,
    useValue: serviceType !== 'memory' ? (!serviceOptions ? {
      storageKey: 'NgShoppingCart',
      clearOnError: true
    } : serviceOptions) : null
  };
}


