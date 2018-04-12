import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextTopicComponent } from './next-topic.component';

describe('NextTopicComponent', () => {
  let component: NextTopicComponent;
  let fixture: ComponentFixture<NextTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
