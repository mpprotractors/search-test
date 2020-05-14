import { NgModule } from '@angular/core';
import {UserListComponent} from './user-list.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UserListComponent
  ]
})
export class UserListModule { }
