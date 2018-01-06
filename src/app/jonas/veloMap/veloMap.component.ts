import { Component } from '@angular/core';
import {AgmCoreModule, MouseEvent} from "@agm/core"
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { Marker, google } from '@agm/core/services/google-maps-types';
import {} from 'mathjs'
import { IVeloCollection, VeloService, marker, IVeloStation } from '../../services/velo.service';
import * as geolib from 'geolib'

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
    public zoom: number = 15;
    icon = "/assets/location2.png";
    icon2 = "/assets/location3.png";
    collection : IVeloCollection;
    stationMarkers : marker[]
    selectMarker : marker
    userLoc : marker
    dichtBij: marker[]
    test : IVeloStation[]

    constructor(private _svc : VeloService)
    {
        this.selectMarker = ({
            id : 0,
            lat: 51.215410,
            lng: 4.414489,
            label: "A",
            draggable: true,
            info:"place me"
        })
        this.userLoc = ({
            id : 0,
            lat: 51.215410,
            lng: 4.414489,
            label: "",
            draggable: false,
            info:"you are here"
        })
    } 
    
    ngOnInit(): void {
        this._svc.getStation().subscribe(result => this.extractData(result)); 
        
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
                this.userLoc.lat = position.coords.latitude;
                this.userLoc.lng = position.coords.longitude;
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
                this.selectMarker.lat = position.coords.latitude;
                this.selectMarker.lng = position.coords.longitude;
                console.log(position.coords); 
                console.log(this.lat);
                console.log(this.lng);
            });
        }
                                                
    }

    extractData(result : IVeloCollection){
        if(result!= null)
        {
            this.collection = result;
            var tmpData = result.data;
            this.stationMarkers = new Array(tmpData.length);
            this.test = new Array(tmpData.length)
            for(var i = 0; i < tmpData.length; i++){
                this.test[i] = tmpData[i];
                this.stationMarkers[i] = ({
                    id : i,
                    lat: parseFloat(tmpData[i].point_lat),
                    lng: parseFloat(tmpData[i].point_lng),
                    label: i.toString(),
                    draggable: false,
                    info: tmpData[i].straatnaam + " "+ tmpData[i].huisnummer
                })
            }
        }
        this.calcDichtBij();     
    }

    clickedMarker(iput :  string)
    {
        var id = parseInt(iput) -1;
        console.log(iput);
        console.log(this.collection.data[id])
    }

    mapClicked($event: MouseEvent) {
        this.selectMarker.lat = $event.coords.lat;
        this.selectMarker.lng = $event.coords.lng;
        this.calcDichtBij();
    }

    calcDichtBij(){
        var tmpMarkers = this.stationMarkers.slice();
        this.dichtBij = Array(5);
        this.dichtBij.sort()
        for(var i =0; i< tmpMarkers.length; i++){
            tmpMarkers[i].distance = geolib.getDistance(
                {
                    latitude: this.selectMarker.lat,
                    longitude: this.selectMarker.lng
                },
                {
                    latitude: tmpMarkers[i].lat,
                    longitude: tmpMarkers[i].lng
                }
            )
            console.log(tmpMarkers[i].distance)
        }
        for(var i = 0; i<5; i++){
            var tmp = -1;
            var tmpId = -1;
            for(var j =1; j < tmpMarkers.length;j++){
                if((tmp > tmpMarkers[j].distance ||tmp == -1) && tmpMarkers[j].distance != -1){
                    tmp = tmpMarkers[j].distance;
                    tmpId = j;
                }
            }
            this.dichtBij[i] = tmpMarkers[tmpId]
            tmpMarkers.splice(tmpId,1)
        }
        //console.log(this.dichtBij)
    }

    markerDragEnd(m: marker, $event: MouseEvent) {
        console.log('dragEnd', m);
        this.selectMarker.lat = $event.coords.lat;
        this.selectMarker.lng = $event.coords.lng;
        this.calcDichtBij();
      }

  }
  