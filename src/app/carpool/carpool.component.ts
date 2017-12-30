import { Component } from '@angular/core';
import {AgmCoreModule} from "@agm/core"
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Marker } from '@agm/core/services/google-maps-types';
import { CarpoolService, ICarpoolCollection } from '../services/carpool.service';

//API used: https://angular-maps.com/guides/getting-started/#setting-up-angular-google-maps
//Google site: https://developers.google.com/maps/documentation/javascript/importing_data

@Component({
selector: 'app-carpool',
templateUrl: './carpool.component.html',
styleUrls: ['./carpool.component.scss']
}) 
export class CarpoolComponent implements OnInit{

    lat: number =  51.2194475;
    lng: number =  4.4024643;
    
    CarpoolLats : number[];
    CarpoolLngs : number[];

    Carpool : ICarpoolCollection;

    constructor(private _svc : CarpoolService){}


    ngOnInit(){
        this._svc.getCarpool()
        .subscribe(result => this.Carpool = result);

        for (var i = 0; i > this.Carpool.data.length -1; i++){
            this.CarpoolLats[i] = this.Carpool.data[i].point_lat;
            this.CarpoolLngs[i] = this.Carpool.data[i].point_lng;


        }
    }

    



}
