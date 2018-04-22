import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AddToCartComponent } from './add-to-cart.component';
import { AddToCartEditorComponent } from '../add-to-cart-editor/add-to-cart-editor.component';
import { CartService } from '../../classes/cart.service';
import { MemoryCartService } from '../../services/memory-cart.service';
import { Component, Type } from '@angular/core';

describe('AddToCartComponent', () => {
  let component: AddToCartComponent;
  let fixture: ComponentFixture<AddToCartComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [AddToCartComponent, AddToCartEditorComponent],
        providers: [
          { provide: CartService, useClass: MemoryCartService }
        ]
      })
      .compileComponents();
  }));

  describe('Default button', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(AddToCartComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create with default values', () => {
      expect(component).toBeTruthy();
      const componentContainer = fixture.debugElement.query(By.css('.add-to-cart'));
      const buttonContainer = fixture.debugElement.query(By.css('.cart-button-container'));
      const button = fixture.debugElement.query(By.css('button'));
      expect(componentContainer).toBeTruthy();
      expect(componentContainer.children.length).toEqual(1);
      expect(buttonContainer).toBeTruthy();
      expect(button).toBeTruthy();
    });

    it('should change the button text', () => {
      component.buttonText = 'Test add';
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.innerHTML.trim()).toEqual('Test add');
      expect(fixture.nativeElement.innerText).toEqual('Test add');
    });

    it('should change the button class', () => {
      component.buttonClass = 'test';
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.className).toEqual('test');
    });

    it('should add a number editor to the button', () => {
      component.type = 'number';
      fixture.detectChanges();
      const editors = fixture.debugElement.queryAll(By.css('input'));
      expect(editors.length).toEqual(1);
      const editor = editors[0];
      expect(editor).toBeTruthy();
      expect(editor.properties['type']).toEqual('number');
    });

    it('should add a text editor to the button', () => {
      component.type = 'text';
      fixture.detectChanges();
      const editors = fixture.debugElement.queryAll(By.css('input'));
      expect(editors.length).toEqual(1);
      const editor = editors[0];
      expect(editor).toBeTruthy();
      expect(editor.properties['type']).toEqual('text');
    });

    it('should add a select editor to the button', () => {
      component.type = 'dropdown';
      fixture.detectChanges();
      const editors = fixture.debugElement.queryAll(By.css('select'));
      expect(editors.length).toEqual(1);
      const editor = editors[0];
      expect(editor).toBeTruthy();
    });
  });

});

const TEST_CMP_TEMPLATE =
  `<add-to-cart [custom]="true">bar</add-to-cart>`;

@Component({ selector: 'cart-add-to-cart-test', template: TEST_CMP_TEMPLATE })
class AddToCartTestComponent {
  itemComponent: Type<any>;
}
