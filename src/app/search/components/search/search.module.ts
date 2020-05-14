import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingModule } from '../loading/loading.module';
import { SearchComponent } from './search.component';
import { ErrorModule } from '../error/error.module';
import {UserListModule} from '../user-list/user-list.module';

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoadingModule,
    ErrorModule,
    UserListModule
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule { }
