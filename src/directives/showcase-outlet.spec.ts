import {
  Compiler, Component, InjectionToken, Injector, NgModule, NgModuleFactory, Type, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {ShowcaseItem} from '../interfaces/showcase-item';
import {CartItem} from '../classes/cart-item';
import {BaseCartItem} from '../classes/base-cart-item';
import {ShowcaseOutletDirective} from './showcase-outlet';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {By} from '@angular/platform-browser';

// region Test setup
const TEST_TOKEN = new InjectionToken('testToken');
const TEST_CMP_TEMPLATE =
  `<ng-template *cartShowcaseOutlet="itemComponent;item:item"></ng-template>`;

@Component({selector: 'cart-showcase-test-cmp', template: TEST_CMP_TEMPLATE})
class ShowcaseTestComponent {
  itemComponent: Type<any>;
  item: CartItem;
}

const TEST_CMP_ADVANCED_TEMPLATE =
  `<ng-template *cartShowcaseOutlet="itemComponent;item:item;injector:injector"></ng-template>`;

@Component({selector: 'cart-showcase-test-cmp', template: TEST_CMP_ADVANCED_TEMPLATE})
class ShowcaseTestAdvancedComponent {
  itemComponent: Type<any>;
  item: CartItem;
  injector: Injector;
}

const TEST_CMP_MODULE_TEMPLATE =
  `<ng-template *cartShowcaseOutlet="itemComponent;item:item;ngModuleFactory:moduleFactory"></ng-template>`;

@Component({selector: 'cart-showcase-test-module-cmp', template: TEST_CMP_MODULE_TEMPLATE})
class ShowcaseTestModuleComponent {
  itemComponent: Type<any>;
  item: CartItem;
  moduleFactory: NgModuleFactory<any>;

  @ViewChild(ShowcaseOutletDirective) ngComponentOutlet: ShowcaseOutletDirective;

  constructor(public viewContainerRef: ViewContainerRef) {}
}

@Component({selector: 'cart-showcase-item-test-cmp', template: '{{item.getName()}}'})
class ShowcaseItemTestComponent implements ShowcaseItem {
  item: CartItem;
}

@Component({selector: 'cart-showcase-item-test-module-cmp', template: '{{item.getId()}}'})
class ShowcaseItemTestModuleComponent implements ShowcaseItem {
  item: CartItem;
}
@Component({selector: 'cart-showcase-item-test-additional-module-cmp', template: '{{item.getId()}} {{item.getName()}}'})
class ShowcaseItemTestAdditionalModuleComponent implements ShowcaseItem {
  item: CartItem;
}

@NgModule({
  declarations: [ShowcaseItemTestModuleComponent],
  exports: [ShowcaseItemTestModuleComponent],
  entryComponents: [ShowcaseItemTestModuleComponent]
})
export class ShowcaseTestModule {
}

@NgModule({
  declarations: [ShowcaseItemTestAdditionalModuleComponent],
  exports: [ShowcaseItemTestAdditionalModuleComponent],
  entryComponents: [ShowcaseItemTestAdditionalModuleComponent]
})
export class ShowcaseTestAdditionalModule {
}
// endregion

describe('ShowcaseOutletDirective', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          ShowcaseTestComponent,
          ShowcaseOutletDirective,
          ShowcaseItemTestComponent,
          ShowcaseTestAdvancedComponent,
          ShowcaseTestModuleComponent,
        ],
        providers: [{provide: TEST_TOKEN, useValue: 'Test token'}]
      })
      .overrideModule(BrowserDynamicTestingModule, {set: {entryComponents: [ShowcaseItemTestComponent]}})
      .compileComponents();
  }));

  it('should do nothing if component is null', async(() => {
    const fixture: ComponentFixture<ShowcaseTestComponent> = TestBed.createComponent(ShowcaseTestComponent);
    const component = fixture.componentInstance;
    component.itemComponent = null;
    fixture.detectChanges();
    expect(fixture.nativeElement.innerText).toEqual('');
  }));

  it('should insert content specified by a component', async(() => {
    const fixture: ComponentFixture<ShowcaseTestComponent> = TestBed.createComponent(ShowcaseTestComponent);
    const component = fixture.componentInstance;
    component.itemComponent = null;
    fixture.detectChanges();
    expect(fixture.nativeElement.innerText).toEqual('');
    component.itemComponent = ShowcaseItemTestComponent;
    component.item = new BaseCartItem({id: 1, name: 'test-item'});
    fixture.detectChanges();
    expect(fixture.nativeElement.innerText).toEqual('test-item');
  }));

  it('should use an injector if one is provided', async(() => {
    const tokenValue = {};
    const fixture: ComponentFixture<ShowcaseTestAdvancedComponent> = TestBed.createComponent(ShowcaseTestAdvancedComponent);
    const component = fixture.componentInstance;
    component.itemComponent = ShowcaseItemTestComponent;
    component.item = new BaseCartItem({id: 1, name: 'test-item'});
    component.injector = Injector.create({
      providers: [{provide: TEST_TOKEN, useValue: tokenValue}],
      parent: fixture.componentRef.injector,
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.innerText).toEqual('test-item');
    const dynamicComp = fixture.debugElement.query(By.css('cart-showcase-item-test-cmp'));
    expect(dynamicComp).toBeTruthy();
    expect(dynamicComp.injector.get(TEST_TOKEN)).toEqual(tokenValue);
  }));

  it('should resolve components from other modules, if supplied', async(() => {
    const compiler = TestBed.get(Compiler) as Compiler;
    const fixture = TestBed.createComponent(ShowcaseTestModuleComponent);
    const component = fixture.componentInstance;
    component.itemComponent = ShowcaseItemTestComponent;
    component.item = new BaseCartItem({id: 1, name: 'test-item'});
    fixture.detectChanges();
    expect(fixture.nativeElement.innerText).toEqual('test-item');
    component.moduleFactory = compiler.compileModuleSync(ShowcaseTestModule);
    component.itemComponent = ShowcaseItemTestModuleComponent;
    fixture.detectChanges();
    expect(fixture.nativeElement.innerText).toEqual('1');
  }));

  it('should clean up moduleRef, if supplied', async(() => {
    const compiler = TestBed.get(Compiler) as Compiler;
    const fixture = TestBed.createComponent(ShowcaseTestModuleComponent);
    const component = fixture.componentInstance;
    component.moduleFactory = compiler.compileModuleSync(ShowcaseTestModule);
    component.itemComponent = ShowcaseItemTestModuleComponent;
    component.item = new BaseCartItem({id: 1, name: 'test-item'});
    fixture.detectChanges();
    expect(fixture.nativeElement.innerText).toEqual('1');
    const moduleRef = component.ngComponentOutlet['_moduleRef'];
    const destroySpy = spyOn(moduleRef, 'destroy').and.callThrough();
    expect(destroySpy).not.toHaveBeenCalled();
    fixture.destroy();
    expect(destroySpy).toHaveBeenCalled();
  }));

  it('should not re-create moduleRef when it didn\'t change', async(() => {
    const compiler = TestBed.get(Compiler) as Compiler;
    const fixture = TestBed.createComponent(ShowcaseTestModuleComponent);
    const component = fixture.componentInstance;
    component.moduleFactory = compiler.compileModuleSync(ShowcaseTestModule);
    component.itemComponent = ShowcaseItemTestModuleComponent;
    component.item = new BaseCartItem({id: 1, name: 'test-item'});
    fixture.detectChanges();
    expect(fixture.nativeElement.innerText).toEqual('1');
    const moduleRef = component.ngComponentOutlet['_moduleRef'];
    component.itemComponent = ShowcaseItemTestComponent;
    fixture.detectChanges();
    expect(fixture.nativeElement.innerText).toEqual('test-item');
    expect(moduleRef).toBe(component.ngComponentOutlet['_moduleRef']);
  }));

  it('should re-create moduleRef when changed', async(() => {
    const compiler = TestBed.get(Compiler) as Compiler;
    const fixture = TestBed.createComponent(ShowcaseTestModuleComponent);
    const component = fixture.componentInstance;
    component.moduleFactory = compiler.compileModuleSync(ShowcaseTestModule);
    component.itemComponent = ShowcaseItemTestModuleComponent;
    component.item = new BaseCartItem({id: 1, name: 'test-item'});
    fixture.detectChanges();
    expect(fixture.nativeElement.innerText).toEqual('1');
    component.moduleFactory = compiler.compileModuleSync(ShowcaseTestAdditionalModule);
    component.itemComponent = ShowcaseItemTestAdditionalModuleComponent;
    fixture.detectChanges();
    expect(fixture.nativeElement.innerText).toEqual('1 test-item');
  }));
});


