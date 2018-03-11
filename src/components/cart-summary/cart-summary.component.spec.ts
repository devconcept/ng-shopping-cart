import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSummaryComponent } from './cart-summary.component';
import { CartService, MemoryCartService } from '../../index';

describe('CartSummaryComponent', () => {
  let component: CartSummaryComponent;
  let fixture: ComponentFixture<CartSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartSummaryComponent ],
      providers: [
        { provide: CartService, useClass: MemoryCartService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
