import {Component, OnInit} from '@angular/core';
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
  private _q = '';
  results = [];
  searched = false;
  canSearch = false;
  sorts = ['name', 'description', 'members'];

  get q(): string {
    return this._q;
  }

  set q(value: string) {
    this._q = value;
    this.updateButton();
  }

  get sort1(): string {
    return this._sort1;
  }

  set sort1(value: string) {
    this.checkSorts('_sort1', value, this.sort1);
    this._sort1 = value;
    this.updateButton();
  }

  get sort2(): string {
    return this._sort2;
  }

  set sort2(value: string) {
    this.checkSorts('_sort2', value, this.sort2);
    this._sort2 = value;
    this.updateButton();
  }

  get sort3(): string {
    return this._sort3;
  }

  set sort3(value: string) {
    this.checkSorts('_sort3', value, this.sort3);
    this._sort3 = value;
    this.updateButton();
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private searchService: SearchService) {

  }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.queryParams;
    if (params && params.q) {
      this._q = params.q;
      if (params.sort) {
        const sort = params.sort;
        if (!Array.isArray(sort) || sort.length !== 3 || sort.find(s => this._defaultOrder.indexOf(s) === -1)) {
          this.routerNavigate({q: this._q});
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
    if (this._q) {
      let queryParams: any = {q: this._q};
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
    this.results = this.searchService.doSearch(this._q, [this.sort1, this.sort2, this.sort3]);
    this.searched = true;
    this.updateButton();
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

  updateButton() {
    const params = this.activatedRoute.snapshot.queryParams;
    const {sort = this.sorts, q = ''} = params;
    this.canSearch = this.q !== q ||
      sort.length !== 3 || sort[0] !== this.sort1 || sort[1] !== this.sort2 || sort[2] !== this.sort3;
  }
}
