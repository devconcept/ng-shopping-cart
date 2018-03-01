import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCartDemoComponent } from './add-to-cart-demo.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddToCartComponent, CartService, MemoryCartService } from '../../../src';
import { AddToCartEditorComponent } from '../../../src/components/add-to-cart-editor/add-to-cart-editor.component';

describe('AddToCartDemoComponent', () => {
  let component: AddToCartDemoComponent;
  let fixture: ComponentFixture<AddToCartDemoComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          AddToCartComponent,
          AddToCartEditorComponent,
          AddToCartDemoComponent
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
    fixture = TestBed.createComponent(AddToCartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
