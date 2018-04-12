import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoAddToCartComponent } from './demo-add-to-cart.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddToCartComponent, CartService, MemoryCartService } from '../../../src';
import { AddToCartEditorComponent } from '../../../src/components/add-to-cart-editor/add-to-cart-editor.component';

describe('DemoAddToCartComponent', () => {
  let component: DemoAddToCartComponent;
  let fixture: ComponentFixture<DemoAddToCartComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          AddToCartComponent,
          AddToCartEditorComponent,
          DemoAddToCartComponent
        ],
        imports: [
          CommonModule,
          FormsModule,
        ],
        providers: [
          { provide: CartService, useClass: MemoryCartService }
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
