import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {By} from '@angular/platform-browser';
import {Component} from '@angular/core';

import {CartShowcaseComponent} from './cart-showcase.component';
import {ShowcaseOutletDirective} from '../../directives/showcase-outlet';
import {CartItem} from '../../classes/cart-item';
import {BaseCartItem, CartShowcaseItemComponent} from '../../';

describe('CartShowcaseComponent', () => {

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          CartShowcaseComponent,
          ShowcaseOutletDirective,
          TestShowcaseRatioComponent,
          TestShowcaseColumnsComponent,
          CartShowcaseItemComponent,
        ]
      })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [CartShowcaseItemComponent]
        }
      })
      .compileComponents();
  }));

  describe('Default component', () => {
    let component: CartShowcaseComponent;
    let fixture: ComponentFixture<CartShowcaseComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(CartShowcaseComponent);
      component = fixture.componentInstance;
    });

    it('should create with square items and the default component', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
      component.items = [new BaseCartItem({id: 1, name: 'Test item 1', price: 14.55})];
      fixture.detectChanges();
      let containers = fixture.debugElement.queryAll(By.css('.showcase-item-container'));
      expect(containers.length).toEqual(1);
      const container = containers[0];
      expect(container.nativeElement.classList.contains('showcase-ratio-1-1')).toEqual(true);
      expect(container.nativeElement.classList.contains('showcase-container-xs-12')).toEqual(true);
      expect(container.nativeElement.classList.contains('showcase-container-s-6')).toEqual(true);
      expect(container.nativeElement.classList.contains('showcase-container-m-4')).toEqual(true);
      expect(container.nativeElement.classList.contains('showcase-container-l-4')).toEqual(true);
      expect(container.nativeElement.classList.contains('showcase-container-xl-3')).toEqual(true);
      const item = fixture.debugElement.query(By.css('.showcase-item.default-showcase-item'));
      expect(item).toBeTruthy();
      expect(item.query(By.css('.default-showcase-item-name')).nativeElement.innerText).toEqual('Test item 1');
      expect(item.query(By.css('.default-showcase-item-price')).nativeElement.innerText).toEqual('$14.55');
      component.items.push(new BaseCartItem({id: 2, name: 'Test item 2', price: 16}));
      fixture.detectChanges();
      containers = fixture.debugElement.queryAll(By.css('.showcase-item-container'));
      expect(containers.length).toEqual(2);
    });
  });

  describe('Aspect ratio', () => {
    let component: TestShowcaseRatioComponent;
    let fixture: ComponentFixture<TestShowcaseRatioComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestShowcaseRatioComponent);
      component = fixture.componentInstance;
    });

    it('should change the class when changing the aspect ratio', () => {
      component.items = [new BaseCartItem({id: 1, name: 'Test item 1', price: 14.55})];
      component.aspectRatio = '2:1';
      fixture.detectChanges();
      const container = fixture.debugElement.query(By.css('.showcase-item-container'));
      expect(container.nativeElement.classList.contains('showcase-ratio-2-1')).toEqual(true);
    });

    it('should not change the value when using a value in the wrong format', () => {
      component.items = [new BaseCartItem({id: 1, name: 'Test item 1', price: 14.55})];
      component.aspectRatio = '2';
      fixture.detectChanges();
      const container = fixture.debugElement.query(By.css('.showcase-item-container'));
      expect(container.nativeElement.classList.contains('showcase-ratio-1-1')).toEqual(true);
    });
  });

  describe('Component columns', () => {
    let component: TestShowcaseColumnsComponent;
    let fixture: ComponentFixture<TestShowcaseColumnsComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestShowcaseColumnsComponent);
      component = fixture.componentInstance;
    });

    it('should column count and the respective classes', () => {
      component.items = [new BaseCartItem({id: 1, name: 'Test item 1', price: 14.55})];
      component.columns = 24;
      component.xsCols = 1;
      component.sCols = 2;
      component.mCols = 3;
      component.lCols = 3;
      component.xlCols = 4;
      fixture.detectChanges();
      const container = fixture.debugElement.query(By.css('.showcase-item-container'));
      expect(container.nativeElement.classList.contains('showcase-container-xs-24')).toEqual(true);
      expect(container.nativeElement.classList.contains('showcase-container-s-12')).toEqual(true);
      expect(container.nativeElement.classList.contains('showcase-container-m-8')).toEqual(true);
      expect(container.nativeElement.classList.contains('showcase-container-l-8')).toEqual(true);
      expect(container.nativeElement.classList.contains('showcase-container-xl-6')).toEqual(true);
    });
  });
});

const TEST_RATIO_TEMPLATE = '<cart-showcase [items]="items" [aspectRatio]="aspectRatio"></cart-showcase>';

@Component({
  selector: 'cart-test-showcase',
  template: TEST_RATIO_TEMPLATE
})
class TestShowcaseRatioComponent {
  items: CartItem[];
  aspectRatio: string;
}

const TEST_COLUMNS_TEMPLATE = '<cart-showcase ' +
  '[items]="items" [xsCols]="xsCols" [sCols]="sCols" [mCols]="mCols" [lCols]="lCols" [xlCols]="xlCols" [columns]="columns">' +
  '</cart-showcase>';

@Component({
  selector: 'cart-test-showcase',
  template: TEST_COLUMNS_TEMPLATE
})
class TestShowcaseColumnsComponent {
  items: CartItem[];
  xsCols: number;
  sCols: number;
  mCols: number;
  lCols: number;
  xlCols: number;
  columns: number;
}
