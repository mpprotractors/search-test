import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MerchantRepository } from '@search-app/data';

import { IMerchant } from 'src/app/models/merchant';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  constructor(private repo: MerchantRepository) { }

  search$(query: string): Observable<IMerchant[]> {
    return this.repo.search$(query);
  }
}
