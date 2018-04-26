{% for member in doc.members %}
{% if member.description and not member.isInput and not member.isOutput %}
#### `{$ member.name $}{% if member.declaration.kind == 152 %}({% for param in member.parameters %}{$ param $}{% endfor %}){% endif %}`
{% if member.type !== 'void' %}
Type: `{% if member.type.typeExpression %}{$ member.type.typeExpression $}{% else %}{$ member.typeInfo $}{% endif %}`
{% if member.initialValue !== undefined %}
Initial value: `{$ member.initialValue $}`
{% endif %}

{% endif %}
{$ member.description $}
{% endif %}
{% endfor %}
