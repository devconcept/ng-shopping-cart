import {Component, OnDestroy, OnInit} from '@angular/core';
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
  github: SafeHtml;
  repoUrl: string;

  constructor(private tocService: TocService, private infoService: InfoService, private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.github = this.sanitizer.bypassSecurityTrustHtml(octicons['mark-github'].toSVG({fill: 'white'}));
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
