import {Component, OnDestroy, OnInit} from '@angular/core';
import {TocService} from '../../shared/services/toc-service';
import {InfoService} from '../../shared/services/info-service';
import {Subscription} from 'rxjs/Subscription';
import {RouteChangedEvent} from '../../shared/services/route-changed-event';

@Component({
  selector: 'doc-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  needsSidebar = true;

  constructor(private tocService: TocService) {

  }

  ngOnInit() {
    const {data: current} = this.tocService.getCurrentState();
    this.updateNavbar(current);
    this.subscription = this.tocService.events.subscribe(evt => {
      if (evt instanceof RouteChangedEvent) {
        const {data} = evt;
        this.updateNavbar(data);
      }
    });
  }

  updateNavbar(data) {
    this.needsSidebar = data.topics && data.topics.length;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
