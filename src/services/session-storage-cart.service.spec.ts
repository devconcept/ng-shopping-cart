import { DefaultCartItem } from '../classes/default-cart-item';
import { SessionStorageCartService } from './session-storage-cart.service';
import { ItemClassService } from './item-class.service';

describe('SessionStorageCartService', () => {
  let service: SessionStorageCartService<DefaultCartItem>;

  beforeEach(() => {
    service = new SessionStorageCartService<DefaultCartItem>(new ItemClassService<DefaultCartItem>(DefaultCartItem), {
      storageKey: 'TestNgCartSession'});
  });

  it('should be empty', () => {
    expect(service.getItems().length).toBe(0);
  });
});
