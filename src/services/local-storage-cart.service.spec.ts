import { BaseCartItem } from '../classes/base-cart-item';
import { LocalStorageCartService } from './local-storage-cart.service';

describe('LocalStorageCartService', () => {
  let service: LocalStorageCartService<BaseCartItem>;

  beforeEach(() => {
    localStorage.removeItem('NgShoppingCart');
    localStorage.removeItem('NgShoppingCartTaxRate');
    localStorage.removeItem('NgShoppingShipping');
    service = new LocalStorageCartService<BaseCartItem>(BaseCartItem, {
      storageKey: 'TestNgCartLocal'
    });
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
    service.setTaxRate(10);
    expect(service.getTaxRate()).toBe(10);
  });

  it('should set shipping cost', () => {
    const item = new BaseCartItem({ id: 1, name: 'Test item', price: 10, photo: '', quantity: 10 });
    service.addItem(item);
    service.setShipping(10);
    expect(service.getShipping()).toBe(10);
  });
});
