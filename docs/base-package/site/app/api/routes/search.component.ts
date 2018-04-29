import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {SearchService} from '../../shared/services/search-service';

@Component({
  selector: 'doc-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  q = '';
  results = [];
  searched = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private searchService: SearchService) {

  }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.queryParams;
    if (params && params.q) {
      this.q = params.q;
      this.searchInDocs();
    }
  }

  onSearch() {
    if (this.q) {
      this.router.navigate(['/api/search'], { queryParams: { q: this.q } }).then(navigated => {
        if (navigated) {
          this.searchInDocs();
        }
      });
    }
  }

  searchInDocs() {
    this.results = this.searchService.doSearch(this.q);
    this.searched = true;
  }
}
