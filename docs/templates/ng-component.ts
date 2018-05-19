import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import * as octicons from 'octicons';

@Component({
  selector: 'doc-{$ doc.computedName $}',
  templateUrl: '{$ doc.ngTemplatePath $}'
})
export class {$ doc.name $} implements OnInit {
  link: SafeHtml;
  constructor(private sanitizer: DomSanitizer) {

  }

  {% if doc.source.howToUse.length > 0 %}
    howToUse: any = {
    {% for how in doc.source.howToUse %}
      '{$ how.title $}': `{$ how.description | escapeQuotes $}`,
    {% endfor %}
    };
  {% endif %}

  ngOnInit() {
    this.link = this.sanitizer.bypassSecurityTrustHtml(octicons.link.toSVG({style: 'vertical-align: middle'}));
  }
}
