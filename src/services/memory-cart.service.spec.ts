import {MemoryCartService} from './memory-cart.service';
import {BaseCartItem} from '../classes/base-cart-item';

describe('MemoryCartService', () => {
  let service: MemoryCartService<BaseCartItem>;
  let subscriptions: any[] = [];

  beforeEach(() => {
    service = new MemoryCartService<BaseCartItem>();
  });

  it('should get the cart contents', () => {
    const item = new BaseCartItem({id: 1, name: 'Test item', price: 10, photo: '', quantity: 10});
    service.addItem(item);
    const items = service.getItems();
    expect(items instanceof Array).toBeTruthy();
    expect(items.length).toEqual(1);
    expect(items[0]).toEqual(item);
  });

  it('should allow to check if the cart is empty', () => {
    expect(service.isEmpty()).toEqual(true);
    const item = new BaseCartItem({id: 1, name: 'Test item', price: 10, photo: '', quantity: 10});
    service.addItem(item);
    expect(service.isEmpty()).toEqual(false);
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

  it('should emit events when adding items', () => {
    let addItemEvent = null;
    let itemsChangedEvent = null;
    let changeEvent = null;
    subscriptions.push(service.onItemAdded.subscribe(evt => addItemEvent = evt));
    subscriptions.push(service.onItemsChanged.subscribe(evt => itemsChangedEvent = evt));
    subscriptions.push(service.onChange.subscribe(evt => changeEvent = evt));
    const item = new BaseCartItem({id: 1, name: 'Test item', price: 10, photo: '', quantity: 10});
    service.addItem(item);
    expect(addItemEvent).toBeTruthy();
    expect(addItemEvent).toEqual(item);
    expect(itemsChangedEvent).toEqual(1);
    expect(changeEvent).toBeTruthy();
    expect(changeEvent.change).toEqual('items');
    expect(changeEvent.value instanceof Array).toBeTruthy();
    expect(changeEvent.value.length).toEqual(1);
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

  it('should emit events when removing items', () => {
    let removeItemEvent = null;
    let itemsChangedEvent = null;
    let changeEvent = null;

    const item = new BaseCartItem({id: 1, name: 'Test item', price: 10, photo: '', quantity: 10});
    service.addItem(item);
    subscriptions.push(service.onItemRemoved.subscribe(evt => removeItemEvent = evt));
    subscriptions.push(service.onItemsChanged.subscribe(evt => itemsChangedEvent = evt));
    subscriptions.push(service.onChange.subscribe(evt => changeEvent = evt));
    service.removeItem(1);
    expect(removeItemEvent).toBeTruthy();
    expect(removeItemEvent).toEqual(item);
    expect(itemsChangedEvent).toEqual(0);
    expect(changeEvent).toBeTruthy();
    expect(changeEvent.change).toEqual('items');
    expect(changeEvent.value instanceof Array).toBeTruthy();
    expect(changeEvent.value.length).toEqual(0);
  });

  it('should not remove items if the id is not found', () => {
    const item = new BaseCartItem({id: 1, name: 'Test item', price: 10, photo: '', quantity: 10});
    service.addItem(item);
    expect(service.itemCount()).toBe(1);
    expect(service.isEmpty()).toBe(false);
    service.removeItem(2);
    expect(service.itemCount()).toBe(1);
    expect(service.isEmpty()).toBe(false);
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
    service.setTaxRate(10);
    expect(service.getTaxRate()).toBe(10);
  });

  it('should emit events when setting the tax rate', () => {
    let changeEvent = null;
    subscriptions.push(service.onChange.subscribe(evt => changeEvent = evt));
    service.setTaxRate(10);
    expect(changeEvent).toBeTruthy();
    expect(changeEvent.change).toEqual('taxRate');
    expect(changeEvent.value).toEqual(10);
  });

  it('should set shipping cost', () => {
    service.setShipping(10);
    expect(service.getShipping()).toBe(10);
  });

  it('should emit events when setting the shipping costs', () => {
    let changeEvent = null;
    subscriptions.push(service.onChange.subscribe(evt => changeEvent = evt));
    service.setShipping(100);
    expect(changeEvent).toBeTruthy();
    expect(changeEvent.change).toEqual('shipping');
    expect(changeEvent.value).toEqual(100);
  });

  it('should emit events when clearing the cart', () => {
    let itemsChangedEvent = null;
    let changeEvent = null;

    const item = new BaseCartItem({id: 1, name: 'Test item', price: 10, photo: '', quantity: 10});
    service.addItem(item);
    subscriptions.push(service.onChange.subscribe(evt => changeEvent = evt));
    subscriptions.push(service.onItemsChanged.subscribe(evt => itemsChangedEvent = evt));
    service.clear();
    expect(changeEvent).toBeTruthy();
    expect(changeEvent.change).toEqual('items');
    expect(changeEvent.value instanceof Array).toBeTruthy();
    expect(changeEvent.value.length).toEqual(0);
  });

  it('should change the currency format', () => {
    let changeEvent = null;

    expect(service.getCurrencyFormat()).toEqual('auto');
    subscriptions.push(service.onChange.subscribe(evt => changeEvent = evt));
    service.setCurrencyFormat('auto:auto');
    expect(service.getCurrencyFormat()).toEqual('auto:auto');
    expect(changeEvent).toBeTruthy();
    expect(changeEvent.change).toEqual('currency');
    expect(changeEvent.value).toEqual('auto:auto');
  });

  it('should throw an error if a invalid currency format is set', () => {
    let changeEvent = null;

    expect(service.getCurrencyFormat()).toEqual('auto');
    subscriptions.push(service.onChange.subscribe(evt => changeEvent = evt));

    const testFn1 = function () {
      service.setCurrencyFormat('');
    };
    const emptyFormatErr = 'Invalid format for currency. Expected a non empty string';

    const testFn2 = function () {
      service.setCurrencyFormat('auto:auto:auto:auto:auto');
    };
    const invalidFormatErr = 'Invalid format for currency.' +
      ' Expected a value in the form currencyCode:symbolDisplay:digitsInfo:locale anf got auto:auto:auto:auto:auto';

    const testFn3 = function () {
      service.setCurrencyFormat('auto:test');
    };
    const invalidSymbolErr = 'Invalid symbol display found. Expected any of code,symbol,symbol-narrow,auto and got test';

    expect(testFn1).toThrowError(emptyFormatErr);
    expect(testFn2)
      .toThrowError(invalidFormatErr);
    expect(testFn3)
      .toThrowError(invalidSymbolErr);
    expect(service.getCurrencyFormat()).toEqual('auto');
    expect(changeEvent).toBeNull();
  });

  afterEach(() => {
    subscriptions.forEach(s => {
      s.unsubscribe();
    });
    subscriptions = [];
  });
});
