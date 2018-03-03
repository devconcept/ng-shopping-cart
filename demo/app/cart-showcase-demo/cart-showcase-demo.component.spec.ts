import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartShowcaseDemoComponent } from './cart-showcase-demo.component';

describe('CartShowcaseDemoComponent', () => {
  let component: CartShowcaseDemoComponent;
  let fixture: ComponentFixture<CartShowcaseDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartShowcaseDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartShowcaseDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
