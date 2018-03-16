import {
  ComponentFactoryResolver, ComponentRef, Directive, Injector, Input, NgModuleFactory, NgModuleRef, OnChanges, OnDestroy, SimpleChanges,
  Type, ViewContainerRef
} from '@angular/core';
import { ShowcaseItem } from '../interfaces/showcase-item';
import { CartItem } from '../classes/cart-item';

@Directive({
  selector: '[cartShowcaseOutlet]',
})
export class ShowcaseOutletDirective implements OnChanges, OnDestroy {
  @Input() cartShowcaseOutlet: Type<any>;
  @Input() cartShowcaseOutletInjector: Injector;
  @Input() cartShowcaseOutletNgModuleFactory: NgModuleFactory<any>;
  @Input() cartShowcaseOutletItem: CartItem;

  private _componentRef: ComponentRef<any> | null = null;
  private _moduleRef: NgModuleRef<any> | null = null;

  constructor(public viewContainerRef: ViewContainerRef) {
  }

  private cleanModule() {
    if (this._moduleRef) {
      this._moduleRef.destroy();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.viewContainerRef.clear();
    this._componentRef = null;

    if (this.cartShowcaseOutlet) {
      const elInjector = this.cartShowcaseOutletInjector || this.viewContainerRef.parentInjector;

      if (changes['ngComponentOutletNgModuleFactory']) {
        this.cleanModule();

        if (this.cartShowcaseOutletNgModuleFactory) {
          const parentModule = elInjector.get(NgModuleRef);
          this._moduleRef = this.cartShowcaseOutletNgModuleFactory.create(parentModule.injector);
        } else {
          this._moduleRef = null;
        }
      }

      const componentFactoryResolver = this._moduleRef ? this._moduleRef.componentFactoryResolver :
        elInjector.get(ComponentFactoryResolver);

      const componentFactory =
        componentFactoryResolver.resolveComponentFactory(this.cartShowcaseOutlet);

      this._componentRef = this.viewContainerRef.createComponent(componentFactory, this.viewContainerRef.length, elInjector);
      (<ShowcaseItem>this._componentRef.instance).item = this.cartShowcaseOutletItem;

    }
  }

  ngOnDestroy() {
    this.cleanModule();
  }
}
