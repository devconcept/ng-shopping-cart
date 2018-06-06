import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DemoAddToCartComponent} from './demo-add-to-cart.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CartService} from '../../../src/classes/cart.service';
import {MemoryCartService} from '../../../src/services/memory-cart.service';
import {ShoppingCartModule} from '../../../src/shopping-cart.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

describe('DemoAddToCartComponent', () => {
  let component: DemoAddToCartComponent;
  let fixture: ComponentFixture<DemoAddToCartComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          DemoAddToCartComponent
        ],
        imports: [
          CommonModule,
          FormsModule,
          ShoppingCartModule,
          NgbModule,
        ],
        providers: [
          {provide: CartService, useClass: MemoryCartService}
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoAddToCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
