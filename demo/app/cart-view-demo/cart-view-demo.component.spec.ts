import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartViewDemoComponent } from './cart-view-demo.component';

describe('CartViewDemoComponent', () => {
  let component: CartViewDemoComponent;
  let fixture: ComponentFixture<CartViewDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartViewDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartViewDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
