/**
 * Class WeatherModel
 */
export class WeatherModel {
  private readonly _location;
  private readonly _alert;
  private readonly _temp;
  private readonly _rain;
  private readonly _feelTemp;


  get location() {
    return this._location;
  }

  get alert() {
    return this._alert;
  }

  get temp() {
    return this._temp;
  }

  get rain() {
    return this._rain;
  }

  get feelTemp() {
    return this._feelTemp;
  }

  constructor(location, alert = 0, temp, rain, feelTemp) {
    this._location = location;
    this._alert = alert;
    this._temp = temp;
    this._rain = rain;
    this._feelTemp = feelTemp;
  }
}
