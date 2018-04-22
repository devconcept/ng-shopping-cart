import { CommonModule } from '@angular/common';
import { Component, NgModule, Type } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { ShowcaseItem } from '../interfaces/showcase-item';
import { CartItem } from '../classes/cart-item';
import { BaseCartItem } from '../classes/base-cart-item';
import { ShowcaseOutletDirective } from './showcase-outlet';

describe('ShowcaseOutletDirective', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TestModule] });
  });

  it('should do nothing if component is null', async(() => {
    const template = `<ng-template *cartShowcaseOutlet="currentComponent"></ng-template>`;
    TestBed.overrideComponent(ShowcaseTestComponent, { set: { template: template } });
    const fixture = TestBed.createComponent(ShowcaseTestComponent);

    fixture.componentInstance.itemComponent = null;
    fixture.detectChanges();

    expect(fixture.nativeElement.innerText).toEqual('');
  }));

  it('should insert content specified by a component', async(() => {
    const fixture = TestBed.createComponent(ShowcaseTestComponent);

    fixture.detectChanges();
    expect(fixture.nativeElement.innerText).toEqual('');

    fixture.componentInstance.itemComponent = ShowcaseItemTestComponent;

    fixture.detectChanges();
    expect(fixture.nativeElement.innerText).toEqual('test-item');
  }));
});

const TEST_CMP_TEMPLATE =
  `<ng-template *ngComponentOutlet="itemComponent;"></ng-template>`;

@Component({ selector: 'cart-showcase-test-cmp', template: TEST_CMP_TEMPLATE })
class ShowcaseTestComponent {
  itemComponent: Type<any>;
}

@Component({ selector: 'cart-showcase-item-test-cmp', template: '{{item.getName()}}' })
class ShowcaseItemTestComponent implements ShowcaseItem {
  item: CartItem = new BaseCartItem({ id: 1, name: 'test-item' });
}

@NgModule({
  imports: [CommonModule],
  declarations: [ShowcaseTestComponent, ShowcaseOutletDirective, ShowcaseItemTestComponent],
  exports: [ShowcaseTestComponent],
  entryComponents: [ShowcaseItemTestComponent]
})
export class TestModule {
}
