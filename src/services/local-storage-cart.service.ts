import { BrowserStorageCartService } from '../classes/browser-storage-cart.service';
import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageCartService extends BrowserStorageCartService {
  constructor() {
    super();
    this.storage = window.localStorage;
  }
}
