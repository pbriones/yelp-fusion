import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/subject';
import { ReplaySubject } from 'rxjs/replaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';

//TODO: update array element for distance api
import { Business } from '../entity/business';
import { Yelp } from '../entity/yelp';

@Injectable()
export class BusinessService {
  private url = 'http://localhost:8080/api/yelp';
  private businesses$: ReplaySubject<Business[]> = new ReplaySubject(1);
  private business$: Subject<Business> = new Subject();
  private businesses: Business[] = [];
  constructor(
    private http: Http
  ) { }

  getBusinesses(query: Yelp): void{
    query.term = 'food';
    query.radius = 5000;
    query.open_now = 'true';
    query.price = '1,2';
    this.http
      .post(`${this.url}/businesses`, query)
      .map((r: Response) => r.json().businesses as Business[])
      .subscribe(businesses => {
        this.businesses = businesses;
        this.businesses$.next(this.businesses);
      });
    // return this.businesses$.asObservable();
  }

  getList(): Observable<Business[]> {
    return this.businesses$.asObservable();
  }

  getBusiness(id: string): Observable<Business> {
    this.http
      .post(`${this.url}/business`, {id: id})
      .map((r: Response) => r.json() as Business)
      .subscribe(business => {
        this.business$.next(business);
      });
    return this.business$.asObservable();
  }

test(): void {
  this.businesses$.subscribe(console.log);
}
}