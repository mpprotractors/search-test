import { Injectable } from '@angular/core';

import { forkJoin, Observable } from 'rxjs';
import { concatAll, map, toArray } from 'rxjs/operators';

import { MerchantService } from '../services/merchant/merchant.service';
import { UserService } from '../services/user/user.service';
import { Merchant, SearchResult, User } from './models';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(
    private merchantService: MerchantService,
    private userService: UserService
  ) { }

  public search(query: string): Observable<SearchResult[]> {
    return forkJoin([
      this.merchantService.search$(query)
        .pipe(
          concatAll(),
          map(merchant => new Merchant(merchant)),
          toArray()
        ),
      this.userService.search$(query)
        .pipe(
          concatAll(),
          map(user => new User(user)),
          toArray()
        )
    ]).pipe(
      map(([merchants, users]) => [...merchants, ...users]),
      map(items => items.sort((item1, item2) => item1.name.localeCompare(item2.name)))
    );
  }
}
