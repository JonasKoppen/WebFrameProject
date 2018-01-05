import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import * as mathjs from 'mathjs';
import { WeatherService, IWeatherResult } from '../../services/weather.service';

interface IWeather{
    location: string;
    description: string;
    temperature: number;
    sunrise: Date;
    sunset: Date;
  }

@Component({
selector: 'app-weather',
templateUrl: './weather.component.html'
}) 
export class WeatherComponent implements OnInit{
    title = 'WeatherComponent';
    private _search: string = "Antwerpen";
    data: IWeather

    constructor(private _svc: WeatherService){}

    ngOnInit(){
      this._svc.getCurrentWeatherAt(this._search)
      .subscribe(result => this.data = this.MapResult(result))
    }
    /*
    ngOnChange(){
      this._svc.getCurrentWeatherAt(this._search)
      .subscribe(result => this.data = this.MapResult(result))
    }
    */

    private MapResult(result : IWeatherResult) : IWeather{
      return{
        location: result.name,
        icon: result.weather[0].icon,
        description: result.weather[0].description,
        temperature: +mathjs.unit(result.main.temp, "K").toNumber("degC").toFixed(1),
        sunrise: new Date(result.sys.sunrise * 1000),
        sunset: new Date(result.sys.sunset * 1000)
      }
    }

    get Search(){
      return this._search;
    }

    set Search(value : string){
      this._search = value;
      this._svc.getCurrentWeatherAt(this._search).subscribe(result => this.data = this.MapResult(result) );
    }
    
}


interface IWeather {
  location: string;
  description: string;
  icon: string;
  temperature: number;
  sunrise: Date;
  sunset: Date;
}

