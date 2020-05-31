import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// TODO: implement routing, make search-module lazy loaded
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
