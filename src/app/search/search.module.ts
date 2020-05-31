import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchComponent } from './components/search.component';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { UiModule } from '../ui/ui.module';

@NgModule({
  declarations: [
    SearchComponent,
    SearchItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiModule
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule {}
