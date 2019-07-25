import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather/weather.service';
import { WeatherModel } from './weather/Weather.model';
import { LocationService } from './location/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Dashboard';
  weather: WeatherModel;

  constructor(
    private weatherService: WeatherService,
    private locationService: LocationService
  ) {
  }

  ngOnInit() {
    this.weatherService.getWeather().subscribe(
      value => {
        this.weather = value;
      });
    console.log(this.locationService.getLocation());

  }

}
