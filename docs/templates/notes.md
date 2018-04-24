{% if doc.note %}
{% for note in doc.note %}
<blockquote class="doc note bg-light">{$ note.description $}</blockquote>
{% endfor %}
{% endif %}
