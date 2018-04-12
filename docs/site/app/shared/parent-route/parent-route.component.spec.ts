import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentRouteComponent } from './parent-route.component';

describe('ParentRouteComponent', () => {
  let component: ParentRouteComponent;
  let fixture: ComponentFixture<ParentRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
