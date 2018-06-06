import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DemoShowcaseItemComponent} from './demo-showcase-item.component';
import {ShoppingCartModule} from '../../../src/shopping-cart.module';
import {CartService} from '../../../src/classes/cart.service';
import {MemoryCartService} from '../../../src/services/memory-cart.service';
import {DemoCartItem} from '../demo-cart-item';

describe('DemoShowcaseItemComponent', () => {
  let component: DemoShowcaseItemComponent;
  let fixture: ComponentFixture<DemoShowcaseItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DemoShowcaseItemComponent,
      ],
      imports: [
        ShoppingCartModule,
      ],
      providers: [
        {provide: CartService, useClass: MemoryCartService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoShowcaseItemComponent);
    component = fixture.componentInstance;
    component.item = new DemoCartItem();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
