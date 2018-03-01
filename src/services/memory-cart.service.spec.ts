import { MemoryCartService } from './memory-cart.service';

describe('MemoryCartService', () => {
  let service: MemoryCartService;

  beforeEach(() => {
    service = new MemoryCartService();
  });

  it('should be empty', () => {
    expect(service.getItems().length).toBe(0);
  });
});
