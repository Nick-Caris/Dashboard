import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { WeatherModel } from './Weather.model';
import { Observable } from 'rxjs';
import { Config } from '../../../config/config';

@Injectable()
export class WeatherService {

  constructor(private http: HttpClient, private config: Config) {
  }

  /***
   * Returns the weather for a given city in The Netherlands
   */
  public getWeather(): Observable<WeatherModel> {
    return this.http.get
    (`http://weerlive.nl/api/json-data-10min.php?key=${this.config.getEnv('Weerlive_API')}&locatie=Nijmegen`)
      .pipe(map(data => {
        data = data['liveweer'][0];
        return new WeatherModel(data['plaats'], data['alarm'], data['temp'], data['d0neerslag'], data['gtemp']);
      }));

  }

}
