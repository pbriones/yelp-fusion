import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/replaySubject';
import { BehaviorSubject } from 'rxjs/behaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Yelp } from '../entity/yelp';

@Injectable()
export class SearchService {
  private yelp$: ReplaySubject<Yelp> = new ReplaySubject(1);
  private term$: BehaviorSubject<string> = new BehaviorSubject('');
  private _term: string = '';
  private yelp: Yelp;

  get term(): Observable<string>{
    return this.term$
      .debounceTime(300)
      .distinctUntilChanged()
  }  
  search(term: string) {
    this._term = term;
    this.term$.next(this._term);
  }  

  private createYelp(yelp: Yelp): Yelp {
    this.yelp = Object.assign(this.yelp, yelp);
    return this.yelp;
  }
}