import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartShowcaseItemComponent } from './cart-showcase-item.component';
import { DefaultCartItem } from '../../classes/default-cart-item';

describe('DefaultShowcaseItemComponent', () => {
  let component: CartShowcaseItemComponent;
  let fixture: ComponentFixture<CartShowcaseItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartShowcaseItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartShowcaseItemComponent);
    component = fixture.componentInstance;
    component.item = new DefaultCartItem();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
