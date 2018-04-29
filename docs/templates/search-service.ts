import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {
  data = [
  {% for d in doc.sources %}
    {$ d | json $},
  {% endfor %}
  ];

  doSearch(term): any[] {
    const toSearch = term.toLowerCase();
    const nameMatch = this.data.filter(d => d.source[0].indexOf(toSearch) !== -1);
    const otherMatch = this.data.filter(d => nameMatch.indexOf(d) === -1
      && d.source.find(s => s.indexOf(term.toLowerCase()) !== -1));
    return nameMatch.concat(otherMatch);
  }
}
