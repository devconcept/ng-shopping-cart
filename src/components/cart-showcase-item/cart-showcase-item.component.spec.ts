import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcaseItemComponent } from './cart-showcase-item.component';

describe('DefaultShowcaseItemComponent', () => {
  let component: ShowcaseItemComponent;
  let fixture: ComponentFixture<ShowcaseItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowcaseItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcaseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
