import {Component, Input} from '@angular/core';

@Component({
  selector: 'doc-next-topic',
  templateUrl: './next-topic.component.html',
})
export class NextTopicComponent {
  @Input() title: string;
  @Input() url: string;
}
