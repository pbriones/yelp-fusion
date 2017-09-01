import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';

import { BusinessService } from '../../service/business.service';
import { DistanceService } from '../../service/distance.service';
import { Business } from '../../entity/business';
import { Direction } from '../../entity/direction';
import { Distance } from '../../entity/distance';
@Component({
  moduleId: module.id,
  selector: 'business-list',
  templateUrl: 'business-list.component.html',
  styleUrls: ['business-list.component.css'],
})
export class BusinessListComponent implements OnInit {
  private businesses$: Observable<Business[]>;
  private distance$: Observable<Distance>;
  private direction: Direction;
  constructor(
    private businessService: BusinessService,

    private distanceService: DistanceService
  ) { }
  ngOnInit(): void {
    this.businesses$ = this.businessService.getList();
    this.direction = {
      origins: ["41, -80"],
      destinations: ["40, -81", "40,-80"],
      units: 'imperial'
    };
    this.distance$ = this.distanceService
      .getDistance(this.direction);
    this.distance$.subscribe(console.log)
    this.businesses$
      .subscribe(bs => {
        this.distanceService
          .getDistance({
            origins: [`${bs[0].coordinates.latitude}, ${bs[0].coordinates.longitude}`],
            destinations: ["40, -81"],
            units: 'imperial'
          });
      })
  }
}