import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { ReplaySubject } from 'rxjs/replaySubject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { BusinessService } from '../../service/business.service';
import { GeolocationService } from '../../service/geolocation.service';
import { SearchService } from '../../service/search.service';

import { Business } from '../../entity/business';
import { Coordinates } from '../../entity/coordinates';
import { Yelp } from '../../entity/yelp';

@Component({
  moduleId: module.id,
  selector: 'business-search',
  templateUrl: 'business-search.component.html',
  styleUrls: ['business-search.component.css'],
  providers: [GeolocationService]
})
export class BusinessSearchComponent implements OnInit {
  private term: string;
  constructor(
    private businessService: BusinessService,
    private geolocationService: GeolocationService,
    private searchService: SearchService
  ) { }
  ngOnInit(): void {
    this.handleSearch();
  }

  search(): void {
    if (!this.term || this.term.toLowerCase() === 'current location') {
      this.term = 'Current Location';
    }
    setTimeout(()=>this.searchService.search(this.term));
  }

  private handleSearch() {
    this.searchService.term
      .subscribe(term => {
        this.term = term;
        if (!term) {
          this.search();
        } else if (term.toLowerCase()
          === 'current location') {
          this.geolocationService
            .getCurrentLocation()
            .subscribe(geolocation => {
              let coords: Coordinates = new Coordinates();
              console.log(geolocation.coords as Coordinates)
              coords.latitude = geolocation.coords.latitude;
              coords.longitude = geolocation.coords.longitude;
              this.getBusiness(coords);
            });
        } else {
          this.getBusiness({
            location: term
          })
        }
      })
  }

  private getBusiness(query: Yelp) {
    this.businessService.getBusinesses(query);
  }
}