import { BaseCartItem } from '../../classes/base-cart-item';
import { SessionStorageCartService } from '../session-storage-cart.service';

describe('SessionStorageCartService', () => {
  let service: SessionStorageCartService<BaseCartItem>;

  beforeEach(() => {
    service = new SessionStorageCartService<BaseCartItem>(BaseCartItem, {
      storageKey: 'TestNgCartSession'});
  });

  it('should be empty', () => {
    expect(service.getItems().length).toBe(0);
  });
});
