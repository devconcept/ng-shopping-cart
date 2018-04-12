import {Component} from '@angular/core';

@Component({
  selector: '{$ doc.computedName $}',
  template: `
<h2>{$ doc.name $}</h2>
<span class="badge badge-warning">Service</span>
{$ doc.description | marked $}
{% for member in doc.members %}
<h4><code>{$ member.name $}</code></h4>
{$ member.description | marked $}
{% endfor %}
`,
})
export class {$ doc.name $}Component {
}
