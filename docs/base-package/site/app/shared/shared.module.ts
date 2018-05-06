import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { NextTopicComponent } from './next-topic/next-topic.component';
import { TocService } from './services/toc-service';
import { InfoService } from './services/info-service';
import { ParentRouteComponent } from './parent-route/parent-route.component';
import { NotImplementedComponent } from './not-implemented/not-implemented.component';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
  ],
  declarations: [NextTopicComponent, ParentRouteComponent, NotImplementedComponent, LayoutComponent, SidebarComponent],
  exports: [NextTopicComponent, ParentRouteComponent, NotImplementedComponent, CommonModule, RouterModule,
   LayoutComponent, SidebarComponent],
  providers: [TocService, Title, InfoService]
})
export class SharedModule {
}
