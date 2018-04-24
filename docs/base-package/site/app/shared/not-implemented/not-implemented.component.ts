import { Component, OnInit } from '@angular/core';
import * as octicons from 'octicons';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'doc-not-implemented',
  templateUrl: './not-implemented.component.html',
  styleUrls: ['./not-implemented.component.scss'],
})
export class NotImplementedComponent implements OnInit {
  icon: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.icon = this.sanitizer.bypassSecurityTrustHtml(octicons.beaker.toSVG({ width: '100%' }));
  }
}
