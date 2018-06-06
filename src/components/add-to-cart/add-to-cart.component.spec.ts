import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {AddToCartComponent} from './add-to-cart.component';
import {AddToCartEditorComponent} from '../add-to-cart-editor/add-to-cart-editor.component';
import {CartService} from '../../services/cart.service';
import {MemoryCartService} from '../../services/memory-cart.service';
import {Component} from '@angular/core';
import {AddToCartPosition, AddToCartType} from '../../types';
import {BaseCartItem, CartItem} from '../../';

// region Test setup
const TEST_EDITOR_TEMPLATE = '<add-to-cart [type]="type" [position]="position"></add-to-cart>';

@Component({
  selector: 'cart-test-add-to-cart',
  template: TEST_EDITOR_TEMPLATE
})
class TestEditorComponent {
  type: AddToCartType;
  position: AddToCartPosition = 'left';
}

const TEST_CUSTOM_BUTTON_TEMPLATE = '<add-to-cart [item]="item" [custom]="custom"><div class="test"></div></add-to-cart>';

@Component({
  selector: 'cart-test-custom-add-to-cart',
  template: TEST_CUSTOM_BUTTON_TEMPLATE
})
class TestCustomButtonComponent {
  item: CartItem;
  custom = true;
}

// endregion

describe('AddToCartComponent', () => {
  let subscriptions = [];

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [AddToCartComponent, AddToCartEditorComponent, TestEditorComponent, TestCustomButtonComponent],
        providers: [
          {provide: CartService, useClass: MemoryCartService}
        ]
      })
      .compileComponents();
  }));

  describe('Default component', () => {
    let component: AddToCartComponent;
    let fixture: ComponentFixture<AddToCartComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(AddToCartComponent);
      component = fixture.componentInstance;
    });

    it('should create with default values', () => {
      fixture.detectChanges();
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
  });

  describe('Component editor', () => {
    let component: TestEditorComponent;
    let fixture: ComponentFixture<TestEditorComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestEditorComponent);
      component = fixture.componentInstance;
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

    it('should place the editor before the button when the position is top or left', () => {
      const testFn = () => {
        const container = fixture.debugElement.query(By.css('.add-to-cart'));
        expect(container).toBeTruthy();
        expect(container.children.length).toEqual(2);
        expect(container.children[0].nativeElement.classList.contains('add-to-cart-component')).toEqual(true);
        expect(container.children[1].nativeElement.classList.contains('cart-button-container')).toEqual(true);
      };

      component.type = 'text';
      component.position = 'left';
      fixture.detectChanges();
      testFn();
      component.position = 'top';
      fixture.detectChanges();
      testFn();
    });

    it('should place the editor after the button when the position is right or bottom', () => {
      const testFn = () => {
        const container = fixture.debugElement.query(By.css('.add-to-cart'));
        expect(container).toBeTruthy();
        expect(container.children.length).toEqual(2);
        expect(container.children[0].nativeElement.classList.contains('cart-button-container')).toEqual(true);
        expect(container.children[1].nativeElement.classList.contains('add-to-cart-component')).toEqual(true);
      };

      component.type = 'text';
      component.position = 'right';
      fixture.detectChanges();
      testFn();
      component.position = 'bottom';
      fixture.detectChanges();
      testFn();
    });

    it('should keep the current value when one of the dropdown values match', () => {
      const addToCart = fixture.debugElement.query(By.css('.add-to-cart'));
      expect(addToCart.componentInstance instanceof AddToCartComponent).toEqual(true);
      component.type = 'text';
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('input'));
      expect(input.componentInstance instanceof AddToCartEditorComponent).toEqual(true);
      input.componentInstance.changeValue(5);
      fixture.detectChanges();
      expect(addToCart.componentInstance.editorQuantity).toEqual(5);
      component.type = 'dropdown';
      fixture.detectChanges();
      const select = fixture.debugElement.query(By.css('select'));
      expect(select.componentInstance instanceof AddToCartEditorComponent).toEqual(true);
      expect(addToCart.componentInstance.editorQuantity).toEqual(5);
    });

    it('should fallback to one of the dropdown values when the current quantity does not match', () => {
      const addToCart = fixture.debugElement.query(By.css('.add-to-cart'));
      component.type = 'text';
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('input'));
      expect(input.componentInstance instanceof AddToCartEditorComponent).toEqual(true);
      input.componentInstance.changeValue(10);
      fixture.detectChanges();
      expect(addToCart.componentInstance.editorQuantity).toEqual(10);
      component.type = 'dropdown';
      fixture.detectChanges();
      const select = fixture.debugElement.query(By.css('select'));
      expect(select.componentInstance instanceof AddToCartEditorComponent).toEqual(true);
      expect(addToCart.componentInstance.editorQuantity).toEqual(1);
    });
  });

  describe('Button click', () => {
    let component: AddToCartComponent;
    let fixture: ComponentFixture<AddToCartComponent>;
    let service: CartService<BaseCartItem>;

    beforeEach(() => {
      fixture = TestBed.createComponent(AddToCartComponent);
      component = fixture.componentInstance;
      service = TestBed.get(CartService);
      service.clear();
    });

    it('should add the item implicit quantity', () => {
      expect(service.itemCount()).toEqual(0);
      component.item = new BaseCartItem({id: 1, name: 'Test item', quantity: 10, price: 10});
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('button'));
      button.nativeElement.click();
      expect(service.itemCount()).toEqual(1);
      const added = service.getItem(1);
      expect(added.getQuantity()).toEqual(10);
    });

    it('should use the component quantity instead if is specified', () => {
      expect(service.itemCount()).toEqual(0);
      component.item = new BaseCartItem({id: 1, name: 'Test item', quantity: 10, price: 10});
      component.quantity = 5;
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('button'));
      button.nativeElement.click();
      expect(service.itemCount()).toEqual(1);
      const added = service.getItem(1);
      expect(added.getQuantity()).toEqual(5);
    });

    it('should  not add anything to the cart when the component has no item binding', () => {
      const added = jasmine.createSpy('added');
      subscriptions.push(component.added.subscribe(added));
      fixture.detectChanges();
      expect(service.itemCount()).toEqual(0);
      const button = fixture.debugElement.query(By.css('button'));
      button.nativeElement.click();
      expect(service.itemCount()).toEqual(0);
      const item = new BaseCartItem({id: 1, name: 'Test item', quantity: 1, price: 10});
      component.item = item;
      fixture.detectChanges();
      button.nativeElement.click();
      expect(service.itemCount()).toEqual(1);
      expect(service.getItem(1)).toEqual(item);
      expect(added).toHaveBeenCalled();
    });
  });

  describe('Custom component', () => {
    let component: TestCustomButtonComponent;
    let fixture: ComponentFixture<TestCustomButtonComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestCustomButtonComponent);
      component = fixture.componentInstance;
    });

    it('should render custom content', () => {
      fixture.detectChanges();
      const container = fixture.debugElement.query(By.css('.cart-button-container'));
      expect(container).toBeTruthy();
      expect(container.query(By.css('.test'))).toBeTruthy();
      component.custom = false;
      fixture.detectChanges();
      expect(container.query(By.css('.test'))).toBeFalsy();
    });

    it('should invoke the addToCart method when the projected content is clicked', () => {
      component.item = new BaseCartItem({id: 1, name: 'Test item', quantity: 1, price: 1});
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.css('add-to-cart'));
      expect(comp.componentInstance instanceof AddToCartComponent).toEqual(true);
      const spy = spyOn(comp.componentInstance, 'addToCart');
      const content = fixture.debugElement.query(By.css('.test'));
      content.nativeElement.click();
      expect(spy).toHaveBeenCalled();
    });

    it('should not invoke the addToCart method when the item binding is not set', () => {
      const service = TestBed.get(CartService);
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.css('add-to-cart'));
      expect(comp.componentInstance instanceof AddToCartComponent).toEqual(true);
      const spy = spyOn(service, 'addItem').and.callThrough();
      const content = fixture.debugElement.query(By.css('.test'));
      content.nativeElement.click();
      expect(spy).not.toHaveBeenCalled();
    });
  });

  afterEach(() => {
    subscriptions.forEach(s => s.unsubscribe());
    subscriptions = [];
  });
});
