import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SearchComponent } from './search.component';
import { UiModule } from '../../ui/ui.module';
import { SearchItemComponent } from './search-item/search-item.component';
import { Merchant } from '../models';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent, SearchItemComponent],
      imports: [UiModule, ReactiveFormsModule, HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate empty input and set error', () => {
    component.executeSearch();
    expect(component.error).toEqual('Query is required');
  });

  it('should validate empty input and render error', () => {
    component.executeSearch();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.input__error').textContent).toContain('Query is required');
  });

  it('should clear search input', () => {
    component.form.patchValue({ search: 'Test' });
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.input__control').value).toContain('Test');
  });
});
