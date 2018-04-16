import { EventEmitter, Injectable } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { RouteChangedEvent } from './route-changed-event';
import { contents } from './toc.data';
import 'rxjs/add/operator/filter';

@Injectable()
export class TocService {
  public data: any = {};
  public url = '/';
  public events = new EventEmitter<RouteChangedEvent>();
  private routeSubscription: Subscription;

  constructor(private router: Router, private title: Title) {
    this.routeSubscription = this.router.events
      .filter<Event>(evt => evt instanceof NavigationEnd)
      .subscribe(evt => {
        const event = <NavigationEnd>evt;
        const url = event.url;
        const fragment = url.indexOf('#');
        this.url = fragment !== -1 ? url.substring(0, fragment) : url;
        this.data = contents.find(c => c.url === this.url);
        if (!this.data) {
          this.data = contents.find(c => c.path === '**');
        }
        const pageTitle = this.data.title;
        this.events.emit(new RouteChangedEvent(this.url, this.data));
        this.title.setTitle(`${pageTitle} - NgShoppingCart`);
      });
  }

  getNavbarItems(): any {
    return contents.reduce((curr, t) => {
      if (t.path !== '**' && t.path !== '') {
        const { title, path } = t;
        if (t.chapter) {
          const found = curr.find(c => c.title === t.chapter && c.submenu);
          const item = { title, path };
          if (found) {
            found.submenu.push(item);
          } else {
            curr.push({ title: t.chapter, submenu: [item] });
          }
        } else if (t.chapter !== false) {
          curr.push({ title, path });
        }
      }
      return curr;
    }, []);
  }

  getCurrentState() {
    return { url: this.url, data: this.data };
  }
}
