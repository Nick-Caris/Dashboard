import { Injectable } from '@angular/core';
import * as Http from 'http';


@Injectable()
export class Config {
  private _config: Object;
  private _env: Object;

  constructor(private http: Http) {
  }

  load() {
    return this.http.get('config/env.json').map(res => res.json()).subscribe((env_data) => this._env = env_data);
  }

  getEnv(key: any) {
    return this._env[key];
  }

  get(key: any) {
    return this._config[key];
  }
}
