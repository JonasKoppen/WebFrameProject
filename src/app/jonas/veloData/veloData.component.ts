import { Component } from "@angular/core";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { marker, VeloService } from "../../services/velo.service";

@Component({
    selector: 'app-veloData',
    templateUrl: './veloData.component.html'
    }) 
export class VeloDataComponent implements OnInit
{
    constructor(private _svc : VeloService){}

    ngOnInit(): void {
        while(this.markers2 == null){
            this.markers2 = this._svc.Markers;
            console.log("hi");
        }
        setInterval(this.checkChange , 1000);
    }
    title = 'velo';
    markers2 : marker[]

    checkChange(){
        this.markers2 = this._svc.Markers;
    }
}