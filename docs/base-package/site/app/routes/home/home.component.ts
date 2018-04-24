import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as octicons from 'octicons';

@Component({
  selector: 'doc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  getStarted:SafeHtml;
  search:SafeHtml;
  examples:SafeHtml;

  constructor(private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    const size = {width: 100, height: 100, fill: 'currentColor'};
    this.getStarted = this.sanitizer.bypassSecurityTrustHtml(octicons.dashboard.toSVG(size));
    this.search = this.sanitizer.bypassSecurityTrustHtml(octicons.search.toSVG(size));
    this.examples = this.sanitizer.bypassSecurityTrustHtml(octicons.paintcan.toSVG(size));
  }
}
