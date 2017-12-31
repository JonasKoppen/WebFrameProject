import { Component } from '@angular/core';
import {AgmCoreModule, MouseEvent} from "@agm/core"
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { Marker, google } from '@agm/core/services/google-maps-types';
import {} from 'mathjs'
import { IVeloCollection, VeloService, marker } from '../../services/velo.service';
//import { loadavg } from 'os';

//API used: https://angular-maps.com/guides/getting-started/#setting-up-angular-google-maps
//Google site: https://developers.google.com/maps/documentation/javascript/importing_data

@Component({
selector: 'app-veloMap',
templateUrl: './veloMap.component.html',
styleUrls: ['./veloMap.component.scss'],
providers:[VeloService]
}) 
export class VeloMapComponent implements OnInit{
    title = 'veloMap';
    public lat: number;
    public lng: number;
    public zoom: number = 12;
    icon = "/assets/location2.png";

    collection : IVeloCollection;
    markers : marker[]
    markers2 : marker
    dichtBij: marker[]
    dichtBij2: marker[]

    constructor(private _svc : VeloService)
    {
        this.markers2 = ({
            id : 0,
            lat: 51.215410,
            lng: 4.414489,
            label: "A",
            draggable: true,
            info:"place me"
        })
    } 
    
    ngOnInit(): void {
        this._svc.getStation().subscribe(result => this.extractData(result)); 
        
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
              this.markers2.lat = position.coords.latitude;
              this.markers2.lng = position.coords.longitude;
              console.log(position.coords); 
              console.log(this.lat);
              console.log(this.lng);
            });
        }
        this.lat = this.markers2.lat
        this.lng = this.markers2.lng                                                     
    }

    extractData(lol : IVeloCollection){
        if(lol!= null)
        {
            this.collection = lol;
            var some = lol.data;
            this.markers = new Array(some.length);
            for(var i = 0; i < some.length; i++){
                this.markers[i] = ({
                    id : i,

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
        this.markers2.lat = $event.coords.lat;
        this.markers2.lng = $event.coords.lng;
        this.calcDichtBij();
    }

    calcDichtBij(){
        var tmpMarkers = this.markers;
        this.dichtBij = Array(5);
        this.dichtBij.sort()
        for(var i =0; i< tmpMarkers.length; i++){
            tmpMarkers[i].distance = Math.sqrt(Math.pow(this.markers2.lat-tmpMarkers[i].lat,2) + Math.pow(this.markers2.lng-tmpMarkers[i].lng,2));
            //console.log(tmpMarkers[i].distance)
        }
        for(var i = 0; i<5; i++){
            var tmp = 5.0;
            var tmpId = -1;
            for(var j =1; j < tmpMarkers.length;j++){
                if(tmp > tmpMarkers[j].distance){
                    tmp = tmpMarkers[j].distance;
                    tmpId = j;
                }
            }
            this.dichtBij[i] = tmpMarkers[tmpId]
            tmpMarkers[tmpId].distance = 15;
        }
        //console.log(this.dichtBij)
    }

    markerDragEnd(m: marker, $event: MouseEvent) {
        console.log('dragEnd', m);
        this.markers2.lat = $event.coords.lat;
        this.markers2.lng = $event.coords.lng;
        this.calcDichtBij();
      }

  }
  
  // just an interface for type safety.