import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Coordinates } from './Location.models';
import { Location } from './Location.models';
import api_keys from 'config/api.json';


const GEOLOCATION_ERRORS = {
  'errors.location.unsupportedBrowser': 'Browser does not support location services',
  'errors.location.permissionDenied': 'You have rejected access to your location',
  'errors.location.positionUnavailable': 'Unable to determine your location',
  'errors.location.timeout': 'Service timeout has been reached'
};


@Injectable()
export class LocationService {
  options: any;

  constructor(private http: HttpClient) {
    this.options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
  }


  /**
   * Get's the coordinates from the browser
   *
   * @param options: an array of the options for geolocation
   */
  private getRawCoordinates(options = this.options): Observable<Coordinates> {

    const observable = Observable.create(observer => {

      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position);
            observer.complete();
          },
          (error) => {
            switch (error.code) {
              case 1:
                observer.error(GEOLOCATION_ERRORS['errors.location.permissionDenied']);
                break;
              case 2:
                observer.error(GEOLOCATION_ERRORS['errors.location.positionUnavailable']);
                break;
              case 3:
                observer.error(GEOLOCATION_ERRORS['errors.location.timeout']);
                break;
            }
          },
          options);
      } else {
        observer.error(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
      }

    });

    return observable.pipe(map(cords => {
      return new Coordinates(cords['coords']['latitude'], cords['coords']['longitude']);
    }));
  }


  /**
   * Converts the geolocation to a promise
   */
  async getCoordinates(): Promise<Coordinates> {
    return await this.getRawCoordinates().toPromise();
  }


  /**
   * converts lat and long to a Location object using the google API
   */
  public async getLocation(): Promise<Location> {

    const coordinates = await this.getCoordinates().then(function (result) {
      return result;
    });

    return this.http.get
    (`https://maps.googleapis.com/maps/api/geocode/json?latlng=
     ${coordinates.longitude},${coordinates.latitude}&key=${api_keys.Google_API}`)
      .pipe(map(value => {
        return new Location(
          value['results'][9]['formatted_address'],
          value['results'][8]['formatted_address'].replace(/,(.*)/, ''),
          value['results'][7]['formatted_address'].replace(/,(.*)/, ''),
          value['results'][3]['formatted_address'].replace(/,(.*)/, ''));
      })).toPromise();

  }

}
