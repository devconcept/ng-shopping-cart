import { Component, OnInit } from '@angular/core';
import * as octicons from 'octicons';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { InfoService } from './shared/services/info-service';


@Component({
  selector: 'docs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  github: SafeHtml;
  law: SafeHtml;
  license: string;

  constructor(private sanitizer: DomSanitizer, private infoService: InfoService) {

  }

  ngOnInit() {
    this.github = this.sanitizer.bypassSecurityTrustHtml(octicons.octoface.toSVG({style: 'vertical-align: middle'}));
    this.law = this.sanitizer.bypassSecurityTrustHtml(octicons.law.toSVG({style: 'vertical-align: text-bottom'}));
    this.license = this.infoService.getRepoUrl() + '/blob/master/LICENSE';
  }
}
