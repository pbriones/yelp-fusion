import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/replaySubject';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class GeolocationService {
  private geolocation$: ReplaySubject<Position> = new ReplaySubject(1);
  getCurrentLocation():Observable<Position>{
    let geolocation = navigator.geolocation;
    if (!geolocation) {
      this.geolocation$.error(new Error('No geolocation'));
    }

    geolocation.getCurrentPosition(
      position => this.geolocation$.next(position),
      e => this.geolocation$.error(e),
      {enableHighAccuracy: true}
    )

    return this.geolocation$.asObservable();
  }
}