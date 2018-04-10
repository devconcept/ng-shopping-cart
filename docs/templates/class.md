## {$ doc.name $}

{% if doc.isAbstract %}<span class="badge badge-warning">Abstract class</span> {% endif %}
{% if not doc.isAbstract %}<span class="badge badge-warning">Class</span> {% endif %}

{$ doc.description $}

{% for member in doc.members %}
#### `{$ member.name $}`

{% if member.declaration.kind == 152 %}method{% endif %}

{% if member.type !== 'void' %}Type: `{$ member.type $}`{% endif %}

{$ member.description $}
{% endfor %} 
