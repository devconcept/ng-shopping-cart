import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartViewComponent } from './cart-view.component';
import { CartService, MemoryCartService } from '../../index';

describe('CartViewComponent', () => {
  let component: CartViewComponent;
  let fixture: ComponentFixture<CartViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartViewComponent ],
      providers: [
        { provide: CartService, useClass: MemoryCartService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
