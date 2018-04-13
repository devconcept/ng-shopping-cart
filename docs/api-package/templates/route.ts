import {Routes} from '@angular/router';
import {ParentRouteComponent} from '{% if doc.location !== '' %}../{% endif %}../shared/parent-route/parent-route.component';

{% for dep in doc.dependencies %}import { {$ dep.name $} } from './routes/{$ dep.path $}';
{% endfor %}

export const routes: Routes = [
  {
    path: '', component: ParentRouteComponent, children: [
      {% for dep in doc.dependencies %}{path: '{$ dep.route $}', component: {$ dep.name $}},
      {% endfor %}
      {% for route in doc.lazyRoutes %}{path: '{$ route.location $}', loadChildren: 'app/api/{$ route.location $}/{$ route.loadChildren $}'},
      {% endfor %}
  ]}
];
