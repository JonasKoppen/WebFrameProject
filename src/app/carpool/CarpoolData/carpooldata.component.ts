import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ICarpoolCollection, CarpoolService } from '../../services/carpool.service';

//API used: https://angular-maps.com/guides/getting-started/#setting-up-angular-google-maps
//Google site: https://developers.google.com/maps/documentation/javascript/importing_data

@Component({
selector: 'app-carpooldata',
templateUrl: './carpooldata.component.html',
}) 
export class CarpoolDataComponent implements OnInit{

   
    Carpool : ICarpoolCollection;



    constructor(private _svc : CarpoolService){
    }

   
   

    ngOnInit(){
            

        this._svc.getCarpool()
        .subscribe(result => this.Carpool = result);

        
    }

}