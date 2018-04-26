{% if doc.howToUse and doc.howToUse.length > 0 %}
### How to use
{% for how in doc.howToUse %}
<div class="how-to-use">{$ how.title $}</div>
{$ how.description $}
{% endfor %}
{% endif %}
