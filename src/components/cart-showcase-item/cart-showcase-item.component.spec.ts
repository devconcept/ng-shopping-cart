import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartShowcaseItemComponent } from './cart-showcase-item.component';

describe('DefaultShowcaseItemComponent', () => {
  let component: CartShowcaseItemComponent;
  let fixture: ComponentFixture<CartShowcaseItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartShowcaseItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartShowcaseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
