import { Component } from '@angular/core';
import {AgmCoreModule} from "@agm/core"
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { VeloService, IVeloStation, IVeloCollection } from '../services/velo.service';

//API used: https://angular-maps.com/guides/getting-started/#setting-up-angular-google-maps
//Google site: https://developers.google.com/maps/documentation/javascript/importing_data

@Component({
selector: 'app-velo',
templateUrl: './velo.component.html',
styleUrls: ['./velo.component.scss']
}) 
export class VeloComponent implements OnInit{
    title = 'velo';
    lat: number = 51.215410;
    lng: number = 4.414489;
    zoom: number = 1;

    stationCollection : IVeloCollection;

    constructor(private _svc : VeloService){}
    
    ngOnInit(): void {
        this._svc.getStation().subscribe(result => this.stationCollection = result);    
        this.dun;
    }

    dun() : void{
        let station = this.stationCollection.VeloStaions;
        for(let i =0; i < station.length ; i++){
            console.log(station[i].point_lat);
        }
        debugger;
    }


}