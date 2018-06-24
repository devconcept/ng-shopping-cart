import {Injectable} from '@angular/core';
import {flatten} from 'lodash';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SearchService {
  data: any[];

  constructor(private httpClient: HttpClient) {

  }

  loadData(): Promise<any> {
    return this.httpClient
      .get('assets/search.json')
      .toPromise();
  }

  search(term, order): Promise<any[]> {
    if (!this.data) {
      return this.loadData().then((data) => {
        this.data = data;
        return this.doSearch(term, order);
      });
    }
    return Promise.resolve(this.doSearch(term, order));
  }

  doSearch(term, order): any[] {
    const toSearch = term.toLowerCase();
    const searchOrder = ['name', 'description', 'members'];
    const searchIndex = order.map(o => searchOrder.indexOf(o));

    const resultArr = new Array(searchOrder.length);
    for (let j = 0; j < resultArr.length; j++) {
      resultArr[j] = [];
    }
    return flatten(this.data.reduce((curr, d) => {
      for (let i = 0; i < searchIndex.length; i++) {
        const index = searchIndex[i];
        const found = d.source[index].indexOf(toSearch);
        if (found !== -1) {
          curr[i].push(d);
          break;
        }
      }
      return curr;
    }, resultArr));
  }
}
