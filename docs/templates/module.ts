import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
{% for mod in doc.modules %}import {{$ mod.imports $}} from '{$ mod.name $}';{% endfor %}
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MarkdownModule} from 'ngx-markdown';
import {SharedModule} from '../{% if doc.location !== '' %}../{% endif %}shared/shared.module';

{% for dep in doc.dependencies %}import { {$ dep.name $} } from './routes/{$ dep.path $}';
{% endfor %}

import {routes} from './routes';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    NgbModule,
    MarkdownModule.forChild(),
  ],
  declarations: [
    {% for dep in doc.dependencies %}{$ dep.name $},
    {% endfor %}
  ],
  exports: []
})
export class {$ doc.name $} {
}
