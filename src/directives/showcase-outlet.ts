import {
  ComponentFactoryResolver, ComponentRef, Directive, Injector, Input, NgModuleFactory, NgModuleRef, OnChanges, OnDestroy, SimpleChanges,
  Type, ViewContainerRef
} from '@angular/core';
import {ShowcaseItem} from '../interfaces/showcase-item';
import {CartItem} from '../classes/cart-item';

/**
 * A directive to create dynamic item components for the showcase component
 * @ignore
 */
@Directive({
  selector: '[cartShowcaseOutlet]',
})
export class ShowcaseOutletDirective implements OnChanges, OnDestroy {
  /**
   * The component to render
   */
  @Input() cartShowcaseOutlet: Type<ShowcaseItem>;
  /**
   * The injector of the selected component
   */
  @Input() cartShowcaseOutletInjector: Injector;
  /**
   * The module factory of the selected component
   */
  @Input() cartShowcaseOutletNgModuleFactory: NgModuleFactory<any>;
  /**
   * The CartItem information to pass into the component
   */
  @Input() cartShowcaseOutletItem: CartItem;
  /**
   * The locale format received from the parent component
   */
  @Input() cartShowcaseOutletFormat: string;

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
    const templateChange = Object.keys(changes).length !== 1 || !changes['cartShowcaseOutletFormat'];
    if (templateChange) {
      this.viewContainerRef.clear();
      this._componentRef = null;

      if (this.cartShowcaseOutlet) {
        const elInjector = this.cartShowcaseOutletInjector || this.viewContainerRef.parentInjector;

        if (changes['cartShowcaseOutletNgModuleFactory']) {
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
        const instance = this._componentRef.instance;
        instance.item = this.cartShowcaseOutletItem;
        instance.format = this.cartShowcaseOutletFormat;
      }
    } else {
      if (this._componentRef) {
        this._componentRef.instance.format = this.cartShowcaseOutletFormat;
      }
    }
  }

  ngOnDestroy() {
    this.cleanModule();
  }
}
