import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DemoAddToCartComponent } from './demo-add-to-cart/demo-add-to-cart.component';
import { CartSummaryDemoComponent } from './demo-cart-summary/demo-cart-summary.component';
import { DemoCheckoutComponent } from './demo-cart-checkout/demo-cart-checkout.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShoppingCartModule, CartService, MemoryCartService } from '../../src';
import { CartViewDemoComponent } from './demo-cart-view/cart-view-demo.component';
import { CartShowcaseDemoComponent } from './demo-cart-showcase/demo-cart-showcase.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          AppComponent,
          DemoAddToCartComponent,
          CartSummaryDemoComponent,
          DemoCheckoutComponent,
          CartViewDemoComponent,
          CartShowcaseDemoComponent,
        ],
        imports: [
          CommonModule,
          FormsModule,
          ShoppingCartModule,
        ],
        providers: [
          { provide: CartService, useClass: MemoryCartService }
        ]
      })
      .compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('NgShoppingCart');
  }));
});
