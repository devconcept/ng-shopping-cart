## {$ doc.name $}

<span class="badge badge-warning">Type</span>

{$ doc.description $}

Values: {$ doc.typeDefinition $}

Meaning:
{% if doc.means %}
{% for means in doc.means %}
{$ means $}
{% endfor %}
{% endif %}
