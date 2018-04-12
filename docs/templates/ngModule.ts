import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../../shared/shared.module';

{% for dep in doc.dependencies %}import { {$ dep.name $} } from './components/{$ dep.path $}';
{% endfor %}

import {routes} from './routes';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    NgbModule,
  ],
  declarations: [
    {% for dep in doc.dependencies %}{$ dep.name $},
    {% endfor %}
  ],
  exports: []
})
export class {$ doc.name $} {
}
