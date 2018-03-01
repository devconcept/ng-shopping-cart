import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartListLayoutComponent } from './cart-list-layout.component';

describe('CartListLayoutComponent', () => {
  let component: CartListLayoutComponent;
  let fixture: ComponentFixture<CartListLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartListLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartListLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
