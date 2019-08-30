/**
 *  class Location
 */
export class Location {
  get province() {
    return this._province;
  }

  private readonly _city;
  private readonly _country;
  private readonly _street;
  private readonly _province;

  get city() {
    return this._city;
  }

  get country() {
    return this._country;
  }

  get street() {
    return this._street;
  }

  constructor(country, province, city, street) {
    this._city = city;
    this._country = country;
    this._street = street;
    this._province = province;
  }
}


/**
 * Class coordinates
 *
 * this class will hold the coordinates returned from window geolocation
 */
export class Coordinates {
  private readonly _longitude;
  private readonly _latitude;

  get longitude() {
    return this._longitude;
  }

  get latitude() {
    return this._latitude;
  }

  constructor(longitude, latitude) {
    this._longitude = longitude;
    this._latitude = latitude;
  }
}
