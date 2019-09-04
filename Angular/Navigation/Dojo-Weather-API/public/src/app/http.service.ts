import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }
  getWeather(city: string){
    return this._http.get(`http://api.openweathermap.org/data/2.5/forecast?id=${city}&APPID=340e2800e6e81224e0f99f1c13513e74`)
    .map(data => data.json())
    .toPromise();
  }
}
