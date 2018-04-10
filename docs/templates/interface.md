## {$ doc.name $}

<span class="badge badge-warning">Interface</span>

{$ doc.description $}

{% for member in doc.members %}
#### `{$ member.name $}`

Type: `{$ member.type $}`

{$ member.description $}
{% endfor %} 
