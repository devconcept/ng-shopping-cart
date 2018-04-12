import {HomeComponent} from './routes/home/home.component';
import {NotFoundComponent} from './routes/not-found/not-found.component';
import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'api', loadChildren: 'app/api/api.module#ApiModule'},
  {path: '**', component: NotFoundComponent}
];

