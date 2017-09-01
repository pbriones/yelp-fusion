import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BusinessSearchComponent } from './component/business-search/business-search.component';
import { BusinessComponent } from './component/business/business.component';
import { BusinessListComponent } from './component/business-list/business-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: BusinessListComponent },
  { path: 'business/:id', component: BusinessComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRouteModule { }
