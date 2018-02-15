import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSummaryDemoComponent } from './cart-summary-demo.component';

describe('CartSummaryDemoComponent', () => {
  let component: CartSummaryDemoComponent;
  let fixture: ComponentFixture<CartSummaryDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartSummaryDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartSummaryDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
