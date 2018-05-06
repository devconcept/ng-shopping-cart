import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TocService} from '../../shared/services/toc-service';
import {InfoService} from '../../shared/services/info-service';
import {Subscription} from 'rxjs/Subscription';
import {RouteChangedEvent} from '../../shared/services/route-changed-event';
import * as octicons from 'octicons';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser'
import {forOwn} from 'lodash';

@Component({
  selector: 'doc-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit, OnDestroy {
  version: string;
  subscription: Subscription;
  navbar: any[] = [];
  navbarOpen = false;
  githubIcon: SafeHtml;
  searchIcon: SafeHtml;
  repoUrl: string;
  isCollapsed = {};

  constructor(
    private tocService: TocService,
    private infoService: InfoService,
    private sanitizer: DomSanitizer,
    private router: Router,
    ) {

  }

  ngOnInit() {
    this.githubIcon = this.sanitizer.bypassSecurityTrustHtml(octicons['mark-github'].toSVG({fill: 'white'}));
    this.searchIcon = this.sanitizer.bypassSecurityTrustHtml(octicons.search.toSVG({style: 'vertical-align:text-bottom;'}));
    this.version = this.infoService.getVersion();
    this.repoUrl = this.infoService.getRepoUrl();
    this.navbar = this.tocService.getNavbarItems();
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  collapseNav(title) {
    forOwn(this.isCollapsed, (v, k) => { this.isCollapsed[k] = false });
    this.isCollapsed[title] = !this.isCollapsed[title];
  }

  search(q) {
    if (q) {
      this.router.navigate(['/api/search'], {queryParams: { q }})
    }
  }

  navigate(url) {
    this.navbarOpen = false;
    this.router.navigate(url);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
