import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {AddToCartEditorComponent} from './add-to-cart-editor.component';
import {By} from '@angular/platform-browser';

describe('AddToCartEditorComponent', () => {
  let component: AddToCartEditorComponent;
  let fixture: ComponentFixture<AddToCartEditorComponent>;
  const subscriptions = [];

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [AddToCartEditorComponent],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToCartEditorComponent);
    component = fixture.componentInstance;
  });

  it('should create a text input with 1 as default', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.value).toEqual(1);
    expect(component.type).toEqual('text');
    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.value).toEqual('1');
    expect(input.nativeElement.type).toEqual('text');
    const select = fixture.debugElement.query(By.css('select'));
    expect(select).toBeNull();
  });

  it('should create a number input if the type matches', () => {
    component.type = 'number';
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.value).toEqual('1');
    expect(input.nativeElement.type).toEqual('number');
    const select = fixture.debugElement.query(By.css('select'));
    expect(select).toBeNull();
  });

  it('should create a select if the type is dropdown', () => {
    component.type = 'dropdown';
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input'));
    expect(input).toBeNull();
    const select = fixture.debugElement.query(By.css('select'));
    expect(select).toBeTruthy();
  });

  it('should emit 1 when the value is not a number', fakeAsync(() => {
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input'));
    const emitSpy = jasmine.createSpy('emit');
    subscriptions.push(component.valueChange.subscribe(emitSpy));
    const event = new Event('change');
    input.nativeElement.value = 'bla';
    input.nativeElement.dispatchEvent(event, {target: {value: 'bla'}});
    tick();
    expect(emitSpy).toHaveBeenCalledWith(1);
  }));

  afterAll(() => {
    subscriptions.forEach(s => s.unsubscribe());
  });
});
