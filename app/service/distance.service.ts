import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/subject';
import { ReplaySubject } from 'rxjs/replaySubject';

import { Direction } from '../entity/direction';
import { Distance } from '../entity/distance';

@Injectable()
export class DistanceService{
  private url: string = 'http://localhost:8080/api/googlemaps';
  private distance$: ReplaySubject<Distance> = new ReplaySubject(1);
  constructor(
    private http: Http
  ) { };
  getDistance(query: Direction): Observable<Distance> {
    this.http
      .post(`${this.url}/distance`, query)
      .map((r:Response)=> this.mapDistance(r))
      .subscribe((distance: Distance) =>{
        this.distance$.next(distance);
      });
    return this.distance$.asObservable();
  }

  private mapDistance(r: Response) {
    const res = r.json();
    const json = res.json;
    const elements = json.rows[0].elements;
    let distance: Distance = {
      origin: json.origin_addresses[0],
      destination: json.destination_addresses[0],
      duration: elements[0].duration.text,
      distance: elements[0].distance.text
    };
    
    return distance;
  }
}