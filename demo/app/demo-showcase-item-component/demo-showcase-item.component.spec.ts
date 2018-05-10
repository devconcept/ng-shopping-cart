import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoShowcaseItemComponent } from './demo-showcase-item.component';

describe('DemoShowcaseItemComponentComponent', () => {
  let component: DemoShowcaseItemComponent;
  let fixture: ComponentFixture<DemoShowcaseItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoShowcaseItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoShowcaseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
