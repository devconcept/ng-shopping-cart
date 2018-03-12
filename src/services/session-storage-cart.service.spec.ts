import { DefaultCartItem } from '../classes/default-cart-item';
import { SessionStorageCartService } from './session-storage-cart.service';

describe('SessionStorageCartService', () => {
  let service: SessionStorageCartService<DefaultCartItem>;

  beforeEach(() => {
    service = new SessionStorageCartService<DefaultCartItem>();
  });

  it('should be empty', () => {
    expect(service.getItems().length).toBe(0);
  });
});
