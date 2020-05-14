import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorComponent } from './error.component';
import {Component, ViewChild} from '@angular/core';
import {ErrorModule} from './error.module';

@Component({
  selector: 'app-testing',
  template: `
    <div>
        <app-error #component [errorMessage]="'text'"></app-error>
    </div>`,
})
export class TestingErrorComponent {
  @ViewChild('component', { static : false }) component;
}

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<TestingErrorComponent>;
  let fixture2: ComponentFixture<ErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ErrorModule],
      declarations: [ TestingErrorComponent ]
    })
      .compileComponents().then(() => {
      fixture = TestBed.createComponent(TestingErrorComponent);
      fixture.detectChanges();
      component = fixture.componentInstance.component;
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default error message', () => {
    fixture2 = TestBed.createComponent(ErrorComponent);
    fixture2.detectChanges();
    fixture2.whenRenderingDone().then(() => {
      expect(fixture2.componentInstance.errorMessage).toBe('Error...');
    });
  });

  it('should have error message changed', () => {
    fixture2 = TestBed.createComponent(ErrorComponent);
    fixture2.detectChanges();
    fixture2.whenRenderingDone().then(() => {
      fixture2.componentInstance.errorMessage = 'test';
      expect(fixture2.componentInstance.errorMessage).toBe('test');
    });
  });

  it('should accept error message as input', () => {
    fixture.whenRenderingDone().then(() => {
      expect(component.errorMessage).toBe('text');
    });
  });
});
