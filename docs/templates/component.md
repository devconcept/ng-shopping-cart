## {$ doc.name $}
<span class="badge badge-warning">Component</span>

Selector: `<{$ doc.ngSelector $}>`

{$ doc.description $}
{% if doc.inputs.length > 0 %}
*@Input()*
{% for input in doc.inputs %}
{% if input.description %}
#### `{$ input.name $}`
Type:`{$ input.type $}`

{$ input.description $}
{% endif %}
{% endfor %}
{% endif %}
{% if doc.outputs.length > 0 %}
*@Output()*

{% for output in doc.outputs %}
{% if output.description %}
#### `{$ output.name $}`
Emits: `{$ output.type | emitterType  $}`

{$ output.description $}
{% endif %}
{% endfor %}
{% endif %}
