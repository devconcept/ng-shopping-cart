import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { markedOptionsFactory } from './markdown-factory';

import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedModule } from './shared/shared.module';
import { DemoModule } from '../../demo/app/demo.module';
import { DemoCartItem } from '../../demo/app/demo-cart-item';
import { ShoppingCartModule } from '../../src/shopping-cart.module';
import { routes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    DemoModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes),
    MarkdownModule.forRoot({
      provide: MarkedOptions,
      useFactory: markedOptionsFactory,
      deps: [Router]
    }),
    ShoppingCartModule.forRoot({
      itemType: DemoCartItem,
      serviceType: 'sessionStorage',
      serviceOptions: {storageKey: 'NgCartDemo', clearOnError: true},
    }),
    SharedModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
