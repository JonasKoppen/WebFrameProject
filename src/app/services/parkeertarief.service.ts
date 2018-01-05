import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/observable/of";

@Injectable()
export class TariefService{
    constructor(private _http: HttpClient) {}

    getTarief(): Observable<IParkeertariefInfo>{
        return this._http.get<IParkeertariefInfo>("http://datasets.antwerpen.be/v4/gis/paparkeertariefzones.json")
      .map(info => {info.data.forEach(data => {data.geometry2 = JSON.parse(data.geometry)}); return info})
    //  .do(data => {this.stationInfo = data; console.log(JSON.stringify(data))})

    }

    stationInfo : IParkeertariefInfo;

   
}

export interface IParkeertariefInfo {
  paging: IPaging;
  data: IData[];
}
export  interface IGeometry{
  type : string;
  coordinates : number[][][];
}
export interface IData {
  id: number;
  objectid: number;
  geometry: string;
  geometry2: IGeometry;
  tariefzone: string;
  tariefkleur: string;
  begindatum: string;
  shape?: any;
  gisid: string;
  starttarief: string;
  extra_tarief: string;
  uurregeling: string;
  maximum_parkeerduur: string;
  dagticket: string;
  status: string;
  link: string;
  kleur: string;
  shape_length: string;
  shape_area: string;
}

export interface IPaging {
  records: number;
  pages: number;
  pageCurrent: number;
  pageNext?: any;
  pagePrev?: any;
  pageSize: number;
}