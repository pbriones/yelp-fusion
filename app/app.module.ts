import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRouteModule } from './app-route.module';

import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BusinessSearchComponent } from './component/business-search/business-search.component';
import { BusinessComponent } from './component/business/business.component';
import { BusinessListComponent } from './component/business-list/business-list.component';

import { BusinessService } from './service/business.service';
import { SearchService } from './service/search.service';
import { DistanceService } from './service/distance.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRouteModule,
  ],
  declarations: [
    AppComponent,
    BusinessSearchComponent,
    BusinessComponent,
    BusinessListComponent
  ],
  providers: [
    BusinessService,
    SearchService,
    DistanceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
