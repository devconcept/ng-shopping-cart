import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartShowcaseComponent } from './cart-showcase.component';

describe('CartShowcaseComponent', () => {
  let component: CartShowcaseComponent;
  let fixture: ComponentFixture<CartShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
