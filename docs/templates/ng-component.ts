import {Component} from '@angular/core';

@Component({
  selector: 'doc-{$ doc.computedName $}',
  templateUrl: '{$ doc.ngTemplatePath $}'
})
export class {$ doc.name $} {
  {% if doc.source.howToUse.length > 0 %}
    howToUse: any = {
    {% for how in doc.source.howToUse %}
      '{$ how.title $}': `{$ how.description | escapeQuotes $}`,
    {% endfor %}
    };
  {% endif %}
}
