## {$ doc.name $}{$ doc.typeParameters | escapeHtml $}

{% if doc.typeParams %}<span class="badge badge-primary">Generic</span>{% endif %}
<span class="badge badge-warning">Service</span>

{% include 'class-inheritance.md' -%}
{$ doc.description $}

Dependencies: {% if doc.dependencies.length === 0 %}
*None*{% endif %}{% if doc.dependencies.length > 0 %}{% for dep in doc.dependencies %}`{$ dep $}`{% if not loop.last %}, {% endif %}{% endfor %}{% endif %}
{% for member in doc.members %}
{% if member.description %}
#### `{$ member.name $}`
{$ member.description $}
{% endif %}
{% endfor %}
{% include 'how-to-use.md' -%}
