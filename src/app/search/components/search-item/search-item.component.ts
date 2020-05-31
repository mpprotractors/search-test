import { Component, Input } from '@angular/core';

import { SearchResult } from '../../models';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent {
  @Input() data?: SearchResult;
}
