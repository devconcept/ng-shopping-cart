import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../shared/shared.module';

import {routes} from './routes';
import { SearchComponent } from './routes/search.component';
import {SearchService} from './search-service'
import {FirstLinePipe} from './pipes/first-line.pipe';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
  ],
  declarations: [SearchComponent, FirstLinePipe],
  providers: [SearchService],
  exports: []
})
export class ApiModule {
}
