## {$ doc.name $}
{% if doc.isAbstract %}
<span class="badge badge-warning">Abstract class</span>
{% endif %}
{% if not doc.isAbstract %}
<span class="badge badge-warning">Class</span>
{% endif %}
{$ doc.description  $}
{% for member in doc.members %}
{% if member.description %}
#### `{$ member.name $}{% if member.declaration.kind == 152 %}(){% endif %}`
{% if member.type !== 'void' %}
Type: `{$ member.type $}`

{% endif %}
{$ member.description $}
{% endif %}
{% endfor %}

