import { Component } from '@angular/core';
import {AgmCoreModule, MouseEvent} from "@agm/core"
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { VeloService, IVeloStation, IVeloCollection } from '../services/velo.service';
import { Marker } from '@agm/core/services/google-maps-types';
import {} from 'mathjs'
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
    public lat: number;
    public lng: number;
    public zoom: number = 12;

    collection : IVeloCollection;
    markers : marker[]
    markers2 : marker[]
    dichtBij: marker[]
    dichtBij2: marker[]

    constructor(private _svc : VeloService){}
    
    ngOnInit(): void {
        this._svc.getStation().subscribe(result => this.extractData(result)); 
        this.markers2 = new Array(2);
        this.markers2[0] = ({
            id : 0,
            lat: 51.215410,
            lng: 4.414489,
            label: "A",
            draggable: true,
            info:"place me"
        })

        this.markers2[1] = ({
            id : 1,
            lat: 51.215410,
            lng: 4.414489,
            label: "B",
            draggable: true,
            info:"place me"
        })

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
              this.markers2[0].lat = position.coords.latitude;
              this.markers2[0].lng = position.coords.longitude;
              console.log(position.coords); 
              console.log(this.lat);
              console.log(this.lng);
            });
        }

        this.lat = this.markers2[0].lat
        this.lng = this.markers2[0].lng   
        this.calcDichtBij();
        this.calcDichtBij2();                                                             
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
        this.markers2[0].lat = $event.coords.lat;
        this.markers2[0].lng = $event.coords.lng;
        this.calcDichtBij();
        this.calcDichtBij2();
    }

    calcDichtBij(){
        var tmpMarkers = this.markers;
        this.dichtBij = Array(5);
        this.dichtBij.sort()
        for(var i =0; i< tmpMarkers.length; i++){
            tmpMarkers[i].distance = Math.sqrt(Math.pow(this.markers2[0].lat-tmpMarkers[i].lat,2) + Math.pow(this.markers2[0].lng-tmpMarkers[i].lng,2));
            console.log(tmpMarkers[i].distance)
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
        console.log(this.dichtBij)
    }
    calcDichtBij2(){
        var tmpMarkers = this.markers;
        this.dichtBij2 = Array(5);
        this.dichtBij2.sort()
        for(var i =0; i< tmpMarkers.length; i++){
            tmpMarkers[i].distance = Math.sqrt(Math.pow(this.markers2[1].lat-tmpMarkers[i].lat,2) + Math.pow(this.markers2[1].lng-tmpMarkers[i].lng,2));
            console.log(tmpMarkers[i].distance)
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
            this.dichtBij2[i] = tmpMarkers[tmpId]
            tmpMarkers[tmpId].distance = 15;
        }
        console.log(this.dichtBij)
    }

    markerDragEnd(m: marker, $event: MouseEvent) {
        console.log('dragEnd', m);
        this.markers2[m.id].lat = $event.coords.lat;
        this.markers2[m.id].lng = $event.coords.lng;
        this.calcDichtBij();
        this.calcDichtBij2();
      }

  }
  
  // just an interface for type safety.
  interface marker {
      id:number;
      lat: number;
      lng: number;
      label?: string;
      draggable: boolean;
      info?:string;
      distance?:number;
  }

    class Station{
        constructor(public id:number,
            public lat:number,
            public lng:number){}
    }
