import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRepository } from '@search-app/data';

import { IUser } from 'src/app/models/user';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private repo: UserRepository) { }

  search$(query: string): Observable<IUser[]> {
    return this.repo.search$(query);
  }
}
