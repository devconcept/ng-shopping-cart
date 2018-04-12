import {Component} from '@angular/core';

@Component({
  selector: '{$ doc.computedName $}',
  template: `
<h2>{$ doc.name $}</h2>

{% block badge %}{% endblock %}

{$ doc.description | marked $}

{% for member in doc.members %}
{% if member.description %}
<h4><code>{$ member.name $}</code></h4>
{% if member.declaration.kind == 152 %}<p>method</p>{% endif %}
{% if member.type !== 'void' %}<p>Type:<code>{$ member.type $}</code></p>{% endif %}
{$ member.description | marked $}
{% endif %}
{% endfor %}
`,
})
export class {$ doc.name $}Component {
}
