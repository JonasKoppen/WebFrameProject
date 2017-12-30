import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/observable/of";

@Injectable()
export class CarpoolService{
    constructor(private _http: HttpClient) {}

    getCarpool(): Observable<ICarpoolCollection>{
        return this._http.get<ICarpoolCollection>("http://datasets.antwerpen.be/v4/gis/carpoolparking.json")
        //.do(data => { console.log(JSON.stringify(data)) }); //Test om te zien of de data wordt opgehaald
    }

    stationInfo : ICarpoolCollection;

    getStationWithCache(): Observable<ICarpoolCollection>{
        if(this.stationInfo)
            return Observable.of(this.stationInfo);
        else
            return this._http.get<ICarpoolCollection>("http://datasets.antwerpen.be/v4/gis/carpoolparking.json")
                .do(data => {this.stationInfo = data; console.log(JSON.stringify(data))})
    }
}

    export interface Paging {
        records: number;
        pages: number;
        pageCurrent: number;
        pageNext?: any;
        pagePrev?: any;
        pageSize: number;
    }

    export interface Datum {
        id: number;
        objectid: number;
        point_lat: number;
        point_lng: number;
        type: string;
        gisid: string;
        naam: string;
    }

    export interface ICarpoolCollection {
        paging: Paging;
        data: Datum[];
    }



