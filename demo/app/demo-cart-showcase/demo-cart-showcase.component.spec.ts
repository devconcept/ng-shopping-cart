import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DemoCartShowcaseComponent} from './demo-cart-showcase.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ShoppingCartModule} from '../../../src/shopping-cart.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

describe('CartShowcaseDemoComponent', () => {
  let component: DemoCartShowcaseComponent;
  let fixture: ComponentFixture<DemoCartShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DemoCartShowcaseComponent],
      imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        ShoppingCartModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoCartShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
