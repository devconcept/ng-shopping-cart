import {BaseCartItem} from './base-cart-item';
import {CartItem} from './cart-item';

describe('BaseCartItem', () => {
  it('should descend from CartItem', () => {
    const item = new BaseCartItem({id: 1, price: 10, quantity: 2});
    expect(item instanceof CartItem).toEqual(true);
    expect(item.total()).toEqual(20);
  });

  it('should set the id', () => {
    const item = new BaseCartItem({id: 1});
    expect(item.getId()).toEqual(1);
    item.setId(2);
    expect(item.getId()).toEqual(2);
    expect(item.id).toEqual(2);
  });

  it('should set the name', () => {
    const item = new BaseCartItem({id: 1, name: 'Test item'});
    expect(item.getName()).toEqual('Test item');
    item.setName('Test item 2');
    expect(item.getName()).toEqual('Test item 2');
    expect(item.name).toEqual('Test item 2');
  });

  it('should set the price', () => {
    const item = new BaseCartItem({id: 1, price: 1});
    expect(item.getPrice()).toEqual(1);
    item.setPrice(5);
    expect(item.getPrice()).toEqual(5);
    expect(item.price).toEqual(5);
  });

  it('should set the quantity', () => {
    let item = new BaseCartItem({id: 1});
    expect(item.getQuantity()).toEqual(1);
    item = new BaseCartItem({id: 1, quantity: 10});
    expect(item.getQuantity()).toEqual(10);
    item.setQuantity(5);
    expect(item.getQuantity()).toEqual(5);
    expect(item.quantity).toEqual(5);
  });

  it('should set the image url', () => {
    const item = new BaseCartItem({id: 1, image: 'test image'});
    expect(item.getImage()).toEqual('test image');
    item.setImage('test image 2');
    expect(item.getImage()).toEqual('test image 2');
    expect(item.image).toEqual('test image 2');
  });

  it('should set arbitrary data', () => {
    const item = new BaseCartItem({id: 1, data: {prop: 'test'}});
    expect(item.getData()).toBeTruthy();
    expect(item.getData().prop).toEqual('test');
    item.setData({prop2: 'test 2'});
    expect(item.getData()).toBeTruthy();
    expect(item.getData().prop).toBeUndefined();
    expect(item.getData().prop2).toEqual('test 2');
    expect(item.data).toEqual(item.getData());
  });
});
