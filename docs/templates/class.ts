{% extends 'class-template.ts' -%}
{% block badge -%}
{% if doc.isAbstract %}<span class="badge badge-warning">Abstract class</span> {% endif %}
{% if not doc.isAbstract %}<span class="badge badge-warning">Class</span> {% endif %}
{% endblock %}
