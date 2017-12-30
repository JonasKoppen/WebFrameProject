import { Component } from '@angular/core';
import {AgmCoreModule} from "@agm/core"
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { VeloService, IVeloStation, IVeloCollection } from '../services/velo.service';
import { Marker } from '@agm/core/services/google-maps-types';
//import { loadavg } from 'os';

//API used: https://angular-maps.com/guides/getting-started/#setting-up-angular-google-maps
//Google site: https://developers.google.com/maps/documentation/javascript/importing_data

@Component({
selector: 'app-velo',
templateUrl: './velo.component.html',
styleUrls: ['./velo.component.scss']
}) 
export class VeloComponent implements OnInit{
    title = 'velo';
    public lat: number = 51.215410;
    public lng: number = 4.414489;
    public zoom: number = 15;

    collection : IVeloCollection;
    coll : marker[]

    constructor(private _svc : VeloService){}
    
    ngOnInit(): void {
        this._svc.getStation().subscribe(result => this.extractData(result));    
    }

    extractData(lol : IVeloCollection){
        if(lol!= null)
        {
            this.collection = lol;
            var some = lol.data;        
            this.markers.push({
                lat: parseFloat(some[0].point_lat)+0.0005,
                lng: parseFloat(some[0].point_lng),
                label: '-1',
                draggable: true
            });
            this.coll = new Array(some.length);
            for(var i = 1; i < some.length-1; i++){
                this.markers.push({
                    lat: parseFloat(some[i].point_lat),
                    lng: parseFloat(some[i].point_lng),
                    label: i.toString(),
                    draggable: false
                })
            }
        }
        else
        {
            console.log("empty bullshit");
        }
       
    }

    clickedMarker(iput :  string)
    {
        var id = parseInt(iput);
        console.log(iput);
        console.log(this.collection.data[id])
        
    }

    markers: marker[] = [
        {
            lat: 51.673858,
            lng: 7.815982,
            label: 'A',
            draggable: true
        }
    ]
  }
  
  // just an interface for type safety.
  interface marker {
      lat: number;
      lng: number;
      label?: string;
      draggable: boolean;
  }

class Station{
    constructor(public id:number,
        public lat:number,
        public lng:number){}
}
