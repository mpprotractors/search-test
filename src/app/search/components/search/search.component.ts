import {Component, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {User} from '../../../models/user';
import {Merchant} from '../../../models/merchant';
import {Constants} from '../../../shared/constants';
import {DocumentExportService} from '../../../services/document-export/document-export.service';
import {Helpers} from '../../../shared/helpers/helpers';
import {SearchService} from '../../../services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnDestroy {

  public hasResults: boolean;
  public loading: boolean;
  public searchTerm = '';
  public searchError = '';
  public searchResults: (User | Merchant)[];

  private readonly destroyed$ = new Subject();

  constructor(
    private readonly documentExportService: DocumentExportService,
    private readonly searchService: SearchService
  ) { }

  public executeSearch(): void {
    this.loading = true;
    this.searchResults = [];
    this.searchError = '';
    this.searchService.searchCustomers(this.searchTerm).pipe(takeUntil(this.destroyed$))
      .subscribe((results) => {
      this.searchResults = [...results[0], ...results[1]].sort((a, b) =>
        Helpers.sortSearchResults(a.name, b.name, a.id, b.id));
      this.hasResults = true;
      this.loading = false;
    }, error => {
      this.searchError = error;
      this.hasResults = false;
      this.loading = false;
    });
  }

  public clearSearch(): void {
    this.hasResults = false;
    this.searchResults = [];
    this.loading = false;
    this.searchError = '';
  }

  public save(): void {
    const headerList = ['Type', 'Name', 'Personal number', 'VAT number'];
    const propertyList = ['type', 'name', 'personId', 'vat'];
    const csvData = this.documentExportService.export(this.searchResults, headerList, propertyList, Constants.FileFormat.Csv);
    const blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    const link = this.createLink(blob);
    this.download(link);
  }

  private download(link: HTMLElement): void {
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private createLink(blob: Blob): HTMLElement {
    const downloadLink = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const isSafariBrowser = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;
    if (isSafariBrowser) {
      downloadLink.setAttribute('target', '_blank');
    }
    downloadLink.setAttribute('href', url);
    const documentName = this.getDocumentName();
    downloadLink.setAttribute('download', documentName + '.csv');
    downloadLink.style.visibility = 'hidden';
    return downloadLink;
  }

  private getDocumentName(): string {
    const date = new Date();
    const dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
      .toISOString()
      .split('T')[0];
    const searchCriteria = this.searchTerm ? this.searchTerm : 'user-search';
    return `${searchCriteria}-${dateString}`;
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
  }
}
