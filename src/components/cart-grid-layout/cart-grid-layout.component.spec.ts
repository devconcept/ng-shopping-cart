import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartGridLayoutComponent } from './cart-grid-layout.component';

describe('CartGridLayoutComponent', () => {
  let component: CartGridLayoutComponent;
  let fixture: ComponentFixture<CartGridLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartGridLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartGridLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
