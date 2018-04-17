import {Component, OnDestroy, OnInit} from '@angular/core';
import {TocService} from '../../shared/services/toc-service';
import {Subscription} from 'rxjs/Subscription';
// import {UpperFirstPipe} from '../../shared/upper-first.pipe';

@Component({
  selector: 'doc-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  private tocSubscription: Subscription;
  // private upperFirst: UpperFirstPipe;
  sidebarTitle: string;
  sidebarPath: string;
  sidebarItems: any[] = [];

  constructor(private tocService: TocService) {
    // this.upperFirst = new UpperFirstPipe();
  }

  ngOnInit() {
    this.updateSidebar(this.tocService.getCurrentState());
    this.tocSubscription = this.tocService.events.subscribe(evt => {
      this.updateSidebar(evt);
    });
  }

  updateSidebar({url, data}) {
    this.sidebarTitle = data.title;
    this.sidebarPath = url;
    this.sidebarItems = data.topics || [];
  }

  ngOnDestroy(): void {
    this.tocSubscription.unsubscribe();
  }

}
