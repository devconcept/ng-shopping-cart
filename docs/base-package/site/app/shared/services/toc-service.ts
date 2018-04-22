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
        const { title, path, chapter, section, menu } = t;
        if (chapter) {
          const found = curr.find(c => c.title === chapter && c.submenu);
          const item = { title, path, menu };
          if (found) {
            if (section) {
              const sect = found.submenu.find(i => i.title === section);
              if (sect) {
                sect.items.push(item);
              } else {
                found.submenu.push({ title: section, section: true, items: [item] });
              }
            } else {
              found.submenu.push(item);
            }
          } else {
            const menu = section ? { title: section, section: true, items: [item] } : item;
            curr.push({ title: chapter, submenu: [menu] });
          }
        } else if (chapter !== false) {
          curr.push({ title, path, menu });
        }
      }
      return curr;
    }, []);
  }

  getCurrentState() {
    return { url: this.url, data: this.data };
  }
}
