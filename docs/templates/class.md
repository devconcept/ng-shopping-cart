## {$ doc.name $}{$ doc.typeParameters | escapeHtml $}

{% if doc.typeParams %}<span class="badge badge-primary">Generic</span>{% endif %}
{% if doc.isAbstract %}<span class="badge badge-warning">Abstract class</span>
{% endif %}{% if not doc.isAbstract %}<span class="badge badge-warning">Class</span>{% endif %}

{% include 'class-inheritance.md' -%}
{$ doc.description  $}
{% include 'notes.md' -%}

{% include 'members.md' -%}
{% include 'how-to-use.md' -%}

