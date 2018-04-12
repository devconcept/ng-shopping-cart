import {Component} from '@angular/core';

@Component({
  selector: '{$ doc.computedName $}',
  template: `
<h2>{$ doc.name $}</h2>
<span class="badge badge-warning">Type</span>
{$ doc.description | marked $}
<p>Values: {$ doc.typeDefinition | backTicks | marked $}</p>
<p>Meaning:</p>
{% if doc.means %}
{% for means in doc.means %}
{$ means.description | marked $}
{% endfor %}
{% endif %}
`,
})
export class {$ doc.name $}Component {
}
