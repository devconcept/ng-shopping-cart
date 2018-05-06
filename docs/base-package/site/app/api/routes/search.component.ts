import {Component, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {SearchService} from '../search-service';

@Component({
  selector: 'doc-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  private _defaultOrder = ['name', 'description', 'members'];
  private _sort1 = 'name';
  private _sort2 = 'description';
  private _sort3 = 'members';
  q = '';
  results = [];
  searched = false;
  sorts = ['name', 'description', 'members'];

  get sort1(): string {
    return this._sort1;
  }

  set sort1(value: string) {
    this.checkSorts('_sort1', value, this.sort1);
    this._sort1 = value;
  }

  get sort2(): string {
    return this._sort2;
  }

  set sort2(value: string) {
    this.checkSorts('_sort2', value, this.sort2);
    this._sort2 = value;
  }

  get sort3(): string {
    return this._sort3;
  }

  set sort3(value: string) {
    this.checkSorts('_sort3', value, this.sort3);
    this._sort3 = value;
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private searchService: SearchService) {

  }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.queryParams;
    if (params && params.q) {
      this.q = params.q;
      if (params.sort) {
        const sort = params.sort;
        if (!Array.isArray(sort) || sort.length !== 3 || sort.find(s => this._defaultOrder.indexOf(s) === -1)) {
          this.routerNavigate({q: this.q});
          return;
        }
        this.sort1 = sort[0];
        this.sort2 = sort[1];
        this.sort3 = sort[2];
      }
      this.searchInDocs();
    }
  }

  onSearch() {
    if (this.q) {
      let queryParams = {q: this.q};
      const sort = [this.sort1, this.sort2, this.sort3];
      const sameOrder = sort.findIndex((m, idx) => m !== this._defaultOrder[idx]);
      if (sameOrder !== -1) {
        queryParams.sort = sort;
      }
      this.routerNavigate(queryParams);
    }
  }

  routerNavigate(queryParams) {
    this.router.navigate(['/api/search'], {queryParams}).then(navigated => {
      if (navigated) {
        this.searchInDocs();
      }
    });
  }

  searchInDocs() {
    this.results = this.searchService.doSearch(this.q, [this.sort1, this.sort2, this.sort3]);
    this.searched = true;
  }

  checkSorts(changed, value, previous): void {
    const fields = ['_sort1', '_sort2', '_sort3'];
    fields.forEach(f => {
      const toCompare = fields.filter(fld => fld !== f);
      const swap = toCompare.find(fld => this[fld] === value);
      if (swap) {
        this[swap] = previous;
      }
    });
  }
}
