import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-burbank',
    templateUrl: './burbank.component.html',
    styleUrls: ['./burbank.component.css']
})
export class BurbankComponent implements OnInit {
    weather;
    temp;
    constructor() { }

    ngOnInit() {
        this.weather = this._httpService.getWeather('4885983').then(weather => {
            console.log(weather);
            this.temp = weather.main.temp;
            console.log(this.weather);
        });
    }
}

// https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=YOUR_API_KEY 