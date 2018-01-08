import { Component } from '@angular/core';
import {AgmCoreModule, MouseEvent} from "@agm/core"
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { Marker, google } from '@agm/core/services/google-maps-types';
import {} from 'mathjs'
import { IVeloCollection, VeloService, marker, IVeloStation } from '../../services/velo.service';
import * as geolib from 'geolib'
import { element } from 'protractor';

//API used: https://angular-maps.com/guides/getting-started/#setting-up-angular-google-maps
//Google site: https://developers.google.com/maps/documentation/javascript/importing_data

@Component({
selector: 'app-veloMapNear',
templateUrl: './veloMapNear.component.html',
styleUrls: ['./veloMapNear.component.scss'],
providers:[VeloService]
}) 
export class VeloMapNearComponent implements OnInit{
    title = 'veloMapNear';
    lat: number =  51.2194475;
    lng: number =  4.4024643;
    zoom: number = 15;
    icon = "/assets/location2.png";
    icon2 = "/assets/location3.png";
    collection : IVeloCollection;
    stationMarkers : marker[]
    selectMarker : marker[]
    userLoc : marker
    dichtBijA: marker[]
    dichtBijB: marker[]
    test : IVeloStation[]
    dataTitleA="Velo stations dichtbij marker A"
    dataTitleB="Velo stations dichtbij marker B"

    constructor(private _svc : VeloService)
    {
        this.selectMarker = new Array(2);
        this.selectMarker[0] = ({
            id : 0,
            lat: 51.215410,
            lng: 4.414489,
            label: "A",
            draggable: true,
            info:"place me"
        })
        this.selectMarker[1] = ({
            id : 1,
            lat: 50.215410,
            lng: 4.414489,
            label: "B",
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
                if(position.coords.latitude == 0 && position.coords.latitude == 0){
                    console.log("hi")
                }
                this.userLoc.lat = position.coords.latitude;
                this.userLoc.lng = position.coords.longitude;
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
                this.selectMarker[0].lat = position.coords.latitude;
                this.selectMarker[0].lng = position.coords.longitude;
                console.log(position.coords); 
                console.log("hi")
                console.log(this.lat);
                console.log(this.lng);
            });
        }
        else{
            console.log("hi")
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
        this.selectMarker[0].lat = $event.coords.lat;
        this.selectMarker[0].lng = $event.coords.lng;
        this.calcDichtBij();
    }

    mapClickedRight($event: MouseEvent) {
        this.selectMarker[1].lat = $event.coords.lat;
        this.selectMarker[1].lng = $event.coords.lng;
        this.calcDichtBij();
    }

    calcDichtBij(){
        var tmpMarkers = this.stationMarkers.slice();
        this.dichtBijA = new Array(3);
        for(var i =0; i< tmpMarkers.length; i++){
            tmpMarkers[i].distance = geolib.getDistance(
                {
                    latitude: this.selectMarker[0].lat,
                    longitude: this.selectMarker[0].lng
                },
                {
                    latitude: tmpMarkers[i].lat,
                    longitude: tmpMarkers[i].lng
                }
            )
        }
        for(var i = 0; i<3; i++){
            var tmp = -1;
            var tmpId = -1;
            for(var j =1; j < tmpMarkers.length;j++){
                if((tmp > tmpMarkers[j].distance ||tmp == -1) && tmpMarkers[j].distance != -1){
                    tmp = tmpMarkers[j].distance;
                    tmpId = j;
                }
            }
            this.dichtBijA[i] = tmpMarkers[tmpId]
            tmpMarkers.splice(tmpId,1)
        }
        //Desination
        tmpMarkers = this.stationMarkers.slice();
        this.dichtBijB = new Array(3);
        for(var i =0; i< tmpMarkers.length; i++){
            tmpMarkers[i].distance = geolib.getDistance(
                {
                    latitude: this.selectMarker[1].lat,
                    longitude: this.selectMarker[1].lng
                },
                {
                    latitude: tmpMarkers[i].lat,
                    longitude: tmpMarkers[i].lng
                }
            )
        }
        for(var i = 0; i<3; i++){
            var tmp = -1;
            var tmpId = -1;
            for(var j =1; j < tmpMarkers.length;j++){
                if((tmp > tmpMarkers[j].distance ||tmp == -1) && tmpMarkers[j].distance != -1){
                    tmp = tmpMarkers[j].distance;
                    tmpId = j;
                }
            }
            this.dichtBijB[i] = tmpMarkers[tmpId]
            tmpMarkers.splice(tmpId,1)
        }

        //console.log(this.dichtBij)
    }

    markerDragEnd(m: marker, $event: MouseEvent) {
        console.log('dragEnd', m);
        m.id
        this.selectMarker[m.id].lat = $event.coords.lat;
        this.selectMarker[m.id].lng = $event.coords.lng;
        this.calcDichtBij();
      }

  }
  