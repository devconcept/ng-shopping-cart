import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartShowcaseComponent } from './cart-showcase.component';
import { ShowcaseOutletDirective } from '../../directives/showcase-outlet';

describe('CartShowcaseComponent', () => {
  let component: CartShowcaseComponent;
  let fixture: ComponentFixture<CartShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartShowcaseComponent, ShowcaseOutletDirective ]
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
