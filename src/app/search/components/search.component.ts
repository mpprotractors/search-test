import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject, EMPTY } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { SearchService } from '../search.service';
import { push } from '../../utils';
import { SearchResult } from '../models';
import { CsvBook } from '../../utils/export';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  public searchResult$ = new BehaviorSubject<SearchResult[]>(null);
  public form = new FormGroup({
    search: new FormControl('', [
        Validators.required,
        // Validators.minLength(3) TODO: It would be great but not described in task
      ]
    )
  });
  public error: string;

  constructor(private searchService: SearchService) {}

  executeSearch() {
    this.form.patchValue({ search: this.form.value.search.trim() });
    if (!this.form.valid) {
      for (const err in this.form.controls.search.errors) {
        switch (err) {
          case 'required':
            this.error = 'Query is required';
            break;
          // TODO: validate other cases
        }
      }
      return;
    }

    this.error = '';
    this.form.disable();
    this.searchService
      .search(this.form.value.search)
      .pipe(
        finalize(() => this.form.enable()),
        catchError(err => {
          this.error = err;
          return EMPTY;
        }),
        push(this.searchResult$)
      )
      .subscribe();
  }

  clearSearch() {
    this.form.patchValue({ search: '' });
    this.searchResult$.next(null);
  }

  itemTrackBy(_, item: SearchResult) {
    return item.id;
  }

  downloadCsv() {
    // Obviously I'll prefer to use one of many good libraries for this task, f.e exceljs
    const book = new CsvBook();
    book.setFileName(`${this.form.value.search}-${new Date().toISOString().substring(0, 10)}`);
    book.setColumns(['Type', 'Name', 'Identifier']);
    book.setData(
      this.searchResult$
        .getValue()
        .map(item => ({ type: item.icon, name: item.name, identifier: item.additionalInfo }))
    );
    book.exportToFile();
  }
}
