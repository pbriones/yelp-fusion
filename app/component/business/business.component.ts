import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { BusinessService } from '../../service/business.service';

import { Business } from '../../entity/business';

@Component({
  moduleId: module.id,
  selector: 'business',
  templateUrl: 'business.component.html',
  styleUrls: ['business.component.css']
})

export class BusinessComponent implements OnInit{
  private business: Business;
  constructor(
    private businessService: BusinessService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.businessService
        .getBusiness(params['id']))
      .subscribe(business => this.business = business);
  }

  goBack(): void {
    this.location.back();
  }
}