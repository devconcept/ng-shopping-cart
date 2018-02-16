import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCartEditorComponent } from './add-to-cart-editor.component';

describe('AddToCartEditorComponent', () => {
  let component: AddToCartEditorComponent;
  let fixture: ComponentFixture<AddToCartEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToCartEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToCartEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
