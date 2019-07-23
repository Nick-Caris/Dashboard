import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { WeatherService } from './weather/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Dashboard';
  weather: any[] = [];

  constructor(
    private http: HttpClient,
    private weatherService: WeatherService
  ) {
    this.weatherService.refresh();
  }


}
