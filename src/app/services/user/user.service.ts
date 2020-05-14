import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { UserRepository } from '@search-app/data';
import {map} from 'rxjs/operators';
import {UserMapper} from '../mappers/user.mapper';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private repo: UserRepository) { }

  search$(query: string): Observable<User[]> {
    return this.repo.search$(query).pipe(
      map((result: User[]) => UserMapper.fromDto(result))
    );
  }
}
