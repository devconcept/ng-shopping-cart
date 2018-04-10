## {$ doc.name $}

<span class="badge badge-warning">Type</span>  

{$ doc.description $}

{% for type in doc.declaration.type.types %}
`{$ type.literal.text $}`
{% endfor %} 
