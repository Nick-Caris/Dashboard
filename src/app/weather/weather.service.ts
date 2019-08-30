import { WeatherModel } from './Weather.model';
import api_keys from 'config/api.json';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class WeatherService {

  constructor(private http: HttpClient) {
  }

  /***
   * Returns the weather for a given city in The Netherlands
   */
  public getWeather(city): Observable<WeatherModel> {
    return this.http.get
    (`http://weerlive.nl/api/json-data-10min.php?key=${api_keys.Weerlive_API}&locatie=${city}`)
      .pipe(map(data => {
        data = data['liveweer'][0];
        return new WeatherModel(data['plaats'], data['alarm'], data['temp'], data['d0neerslag'], data['gtemp']);
      }));

  }

}
