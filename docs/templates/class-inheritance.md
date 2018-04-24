{% if doc.extendsClauses.length %}
Extends: {% for ext in doc.extendsClauses %}{% if ext.doc %}<a href="{$ ext.doc.chapter + '/' + ext.doc.location + '/' + ext.doc.computedName $}">`{$ ext.text $}`</a>{% else %}`{$ ext.text $}`{% endif %}{% if not loop.last %},{% endif %}{% endfor %}
{% endif %}
