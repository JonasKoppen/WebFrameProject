import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/observable/of";

@Injectable()
export class VeloService{
    constructor(private _http: HttpClient) {}

    getStation(): Observable<IVeloCollection>{
        return this._http.get<IVeloCollection>("http://datasets.antwerpen.be/v4/gis/velostation.json")
        //.do(data => { console.log(JSON.stringify(data)) }); //Test om te zien of de data wordt opgehaald
    }

    stationInfo : IVeloCollection;

    getStationWithCache(): Observable<IVeloCollection>{
        if(this.stationInfo)
            return Observable.of(this.stationInfo);
        else
            return this._http.get<IVeloCollection>("http://datasets.antwerpen.be/v4/gis/velostation.json")
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

export interface IVeloStation {
    id: number;
    objectid: number;
    point_lat: string;
    point_lng: string;
    shape?: any;
    objecttype: string;
    type_velo: string;
    ligging: string;
    straatnaam: string;
    huisnummer: string;
    aanvulling: string;
    district: string;
    postcode: string;
    objectcode: string;
    gebruik: string;
}

export interface IVeloCollection {
    paging: Paging;
    data: IVeloStation[];
}


    