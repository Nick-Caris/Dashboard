import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class WeatherService {
  private weather: any[] = [];


  constructor(private http: HttpClient) {
    this.getWeather();
  }

  private getWeather() {
    console.log('start func');
    this.http.get('http://weerlive.nl/api/json-data-10min.php?key=51a306b528&locatie=Nijmegen').pipe(map(data => {
      console.log(data);
      this.weather.push({
        key: 'plaats',
        value: data
      });
      // this.weather['temp'] = data['lifeweer'];
      console.log(this.weather);
    })).subscribe();

  }

  public refresh() {
    this.getWeather();
  }


}
