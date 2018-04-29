import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TocService} from '../../shared/services/toc-service';
import {InfoService} from '../../shared/services/info-service';
import {Subscription} from 'rxjs/Subscription';
import {RouteChangedEvent} from '../../shared/services/route-changed-event';
import * as octicons from 'octicons';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser'

@Component({
  selector: 'doc-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit, OnDestroy {
  version: string;
  subscription: Subscription;
  navbar: any[] = [];
  navbarOpen = true;
  needsSidebar = true;
  githubIcon: SafeHtml;
  searchIcon: SafeHtml;
  repoUrl: string;

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
    const {data: current} = this.tocService.getCurrentState();
    this.updateNavbar(current);
    this.subscription = this.tocService.events.subscribe(evt => {
      if (evt instanceof RouteChangedEvent) {
        const {data} = evt;
        this.updateNavbar(data);
      }
    });
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  updateNavbar(data) {
    this.needsSidebar = data.topics && data.topics.length;
  }

  search(q) {
    if (q) {
      this.router.navigate(['/api/search'], {queryParams: { q }})
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
