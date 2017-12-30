import { Component } from '@angular/core';
import {AgmCoreModule, MouseEvent} from "@agm/core"
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
    markers : marker[]

    constructor(private _svc : VeloService){}
    
    ngOnInit(): void {
        this._svc.getStation().subscribe(result => this.extractData(result));    
    }

    extractData(lol : IVeloCollection){
        if(lol!= null)
        {
            this.collection = lol;
            var some = lol.data;
            this.markers = new Array(some.length);
            this.markers[0] = ({
                lat: parseFloat(some[0].point_lat),
                lng: parseFloat(some[0].point_lng),
                label: "select",
                draggable: true,
                info:"place me"
            })
            for(var i = 0; i < some.length; i++){
                this.markers[i+1] = ({
                    lat: parseFloat(some[i].point_lat),
                    lng: parseFloat(some[i].point_lng),
                    label: i.toString(),
                    draggable: false,
                    info:"adres: "+some[i].straatnaam + " "+ some[i].huisnummer
                })
            }
        }
       
    }

    clickedMarker(iput :  string)
    {
        var id = parseInt(iput) -1;
        console.log(iput);
        console.log(this.collection.data[id])
        
    }

    mapClicked($event: MouseEvent) {
        this.markers[0] = ({
          lat: $event.coords.lat,
          lng: $event.coords.lng,
          draggable: true
        });
      }
  }
  
  // just an interface for type safety.
  interface marker {
      lat: number;
      lng: number;
      label?: string;
      draggable: boolean;
      info?:string
  }

class Station{
    constructor(public id:number,
        public lat:number,
        public lng:number){}
}
