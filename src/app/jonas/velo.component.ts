import { Component } from '@angular/core';
import {AgmCoreModule} from "@agm/core"

//API used: https://angular-maps.com/guides/getting-started/#setting-up-angular-google-maps

@Component({
selector: 'app-velo',
templateUrl: './velo.component.html',
styleUrls: ['./velo.component.scss']
}) 
export class VeloComponent{
    title = 'velo';
    lat: number = 51.215410;
    lng: number = 4.414489;
}