import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import {SearchModule} from './search.module';
import {SearchService} from '../../../services/search/search.service';
import {DocumentExportService} from '../../../services/document-export/document-export.service';
import {HttpClientModule} from '@angular/common/http';
import {of} from 'rxjs';
import {User} from '../../../models/user';

describe('SearchComponent', () => {

  const searchServiceMock = {
    searchCustomers: () => of([[], []])
  };

  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SearchModule, HttpClientModule],
      providers: [
        {provide: SearchService, useValue: searchServiceMock},
        DocumentExportService]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(SearchComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('executeSearch', () => {
    component.searchResults = [new User()];
    component.hasResults = false;
    component.executeSearch();
    fixture.detectChanges();
    expect(component.loading).toBeFalsy();
    expect(component.searchResults).toEqual([]);
    expect(component.hasResults).toBeTruthy();
  });

  it('clearSearch', () => {
    component.loading = true;
    component.searchResults = [new User()];
    component.hasResults = true;
    component.searchError = 'error';
    component.clearSearch();
    fixture.detectChanges();
    expect(component.loading).toBeFalsy();
    expect(component.searchResults).toEqual([]);
    expect(component.hasResults).toBeFalsy();
    expect(component.searchError).toBe('');
  });
});
