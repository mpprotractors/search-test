import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComponent } from './loading.component';
import {Component, ViewChild} from '@angular/core';
import {LoadingModule} from './loading.module';

@Component({
  selector: 'app-testing',
  template: `
    <div>
        <app-loading #component [loadingText]="'text'"></app-loading>
    </div>`,
})
export class TestingLoadingComponent {
  @ViewChild('component', { static : false }) component;
}

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<TestingLoadingComponent>;
  let fixture2: ComponentFixture<LoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LoadingModule],
      declarations: [ TestingLoadingComponent ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(TestingLoadingComponent);
      fixture.detectChanges();
      component = fixture.componentInstance.component;
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default loading message', () => {
    fixture2 = TestBed.createComponent(LoadingComponent);
    fixture2.detectChanges();
    fixture2.whenRenderingDone().then(() => {
      expect(fixture2.componentInstance.loadingText).toBe('Loading');
    });
  });

  it('should have loading message changed', () => {
    fixture2 = TestBed.createComponent(LoadingComponent);
    fixture2.detectChanges();
    fixture2.whenRenderingDone().then(() => {
      fixture2.componentInstance.loadingText = 'test';
      expect(fixture2.componentInstance.loadingText).toBe('test');
    });
  });

  it('should accept loading message as input', () => {
    fixture.whenRenderingDone().then(() => {
      expect(component.loadingText).toBe('text');
    });
  });
});
