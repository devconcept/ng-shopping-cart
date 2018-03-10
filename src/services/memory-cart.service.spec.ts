import { MemoryCartService } from './memory-cart.service';
import DefaultCartItem from '../classes/default-cart-item';

describe('MemoryCartService', () => {
  let service: MemoryCartService<DefaultCartItem>;

  beforeEach(() => {
    service = new MemoryCartService<DefaultCartItem>();
  });

  it('should be empty', () => {
    expect(service.getItems().length).toBe(0);
  });
});
