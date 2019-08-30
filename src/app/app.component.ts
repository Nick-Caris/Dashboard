import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather/weather.service';
import { WeatherModel } from './weather/Weather.model';
import { LocationService } from './location/Location.service';
import { Location } from './location/Location.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Dashboard';
  weather: WeatherModel;
  location: Location;

  constructor(
    private weatherService: WeatherService,
    private locationService: LocationService
  ) {
  }

  async ngOnInit() {

    this.location = await this.locationService.getLocation().then(function (result) {
      console.log(result);
      return result;
    });

    this.weatherService.getWeather(this.location.city).subscribe(
      value => {
        console.log('weather updated');
        this.weather = value;
      });

  }
}
