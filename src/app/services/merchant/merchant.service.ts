import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Merchant } from 'src/app/models/merchant';
import { MerchantRepository } from '@search-app/data';
import {map} from 'rxjs/operators';
import {MerchantMapper} from '../mappers/merchant.mapper';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  constructor(private repo: MerchantRepository) { }

  search$(query: string): Observable<Merchant[]> {
    return this.repo.search$(query).pipe(
      map((result: Merchant[]) => MerchantMapper.fromDto(result))
    );
  }
}
