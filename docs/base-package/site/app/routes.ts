import {HomeComponent} from './routes/home/home.component';
import {NotFoundComponent} from './routes/not-found/not-found.component';
import {Routes} from '@angular/router';
// import { NotImplementedComponent } from './shared/not-implemented/not-implemented.component';
import { DemoComponent } from '../../demo/app/demo.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'api', loadChildren: 'app/api/api.module#ApiModule'},
  {path: 'guide', loadChildren: 'app/guide/guide.module#GuideModule'},
  {path: 'demo', component: DemoComponent},
  {path: '**', component: NotFoundComponent}
];

