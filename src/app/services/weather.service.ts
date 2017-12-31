import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";



@Injectable()
export class WeatherService{
    constructor(private _http: HttpClient){}

    getCurrentWeather(): Observable<IWeatherResult>{
        return this._http.get<IWeatherResult>(`http://api.openweathermap.org/data/2.5/weather?q=Antwerpen&lang=nl&APPID=c29dbdf3ccc2d57a361ceaeac49d9e53`);
         // .do(data => console.log(JSON.stringify(data)));
    }

    getCurrentWeatherAt(location:string) : Observable<IWeatherResult>
    {
        return this._http.get<IWeatherResult>(`http://api.openweathermap.org/data/2.5/weather?q=${location}&lang=nl&APPID=c29dbdf3ccc2d57a361ceaeac49d9e53`);
    }
}



    
export interface ICoord {
    lon: number;
    lat: number;
}

export interface IWeather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface IMain {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
}

export interface IWind {
    speed: number;
    deg: number;
}

export interface IClouds {
    all: number;
}

export interface ISys {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface IWeatherResult {
    coord: ICoord;
    weather: IWeather[];
    base: string;
    main: IMain;
    visibility: number;
    wind: IWind;
    clouds: IClouds;
    dt: number;
    sys: ISys;
    id: number;
    name: string;
    cod: number;
}
    
    
    
    