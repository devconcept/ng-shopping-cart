import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCartDemoComponent } from './add-to-cart-demo.component';

describe('AddToCartDemoComponent', () => {
  let component: AddToCartDemoComponent;
  let fixture: ComponentFixture<AddToCartDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToCartDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToCartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
