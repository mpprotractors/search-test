import { Injectable } from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {UserService} from '../user/user.service';
import {MerchantService} from '../merchant/merchant.service';
import {User} from '../../models/user';
import {Merchant} from '../../models/merchant';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private readonly userService: UserService,
              private readonly merchantService: MerchantService) { }

  searchCustomers(searchTerm: string): Observable<[User[], Merchant[]]> {
    const userSearch = this.userService.search$(searchTerm);
    const merchantSearch = this.merchantService.search$(searchTerm);
    return forkJoin(userSearch, merchantSearch);
  }
}
