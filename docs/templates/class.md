## {$ doc.name $}{$ doc.typeParameters | escapeHtml $}

{% if doc.typeParams %}<span class="badge badge-primary">Generic</span>{% endif %}
{% if doc.isAbstract %}<span class="badge badge-warning">Abstract class</span>
{% endif %}{% if not doc.isAbstract %}<span class="badge badge-warning">Class</span>{% endif %}

{% if doc.extendsClauses.length %}
Extends: {% for ext in doc.extendsClauses %}`{$ ext.text $}`{% if not loop.last %},{% endif %}{% endfor %}
{% endif %}
{$ doc.description  $}
{% for member in doc.members %}
{% if member.description %}
#### `{$ member.name $}{% if member.declaration.kind == 152 %}({% for param in member.parameters %}{$ param $}{% endfor %}){% endif %}`
{% if member.type !== 'void' %}
Type: `{% if member.type.typeExpression %}{$ member.type.typeExpression $}{% else %}{$ member.type $}{% endif %}`

{% endif %}
{$ member.description $}
{% endif %}
{% endfor %}

