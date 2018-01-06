import { Component, OnInit } from '@angular/core';
import { TariefService, IParkeertariefInfo } from '../../services/parkeertarief.service';
import { HttpClient } from '@angular/common/http/src/client';
import * as _ from "lodash";


//API used: https://angular-maps.com/guides/getting-started/#setting-up-angular-google-maps
//Google site: https://developers.google.com/maps/documentation/javascript/importing_data

@Component({
selector: 'app-tariefdata',
templateUrl: './tariefdata.component.html',
styleUrls: ['./tariefdata.component.scss']
}) 


export class TariefDataComponent implements OnInit
{
    
    constructor(private _svc : TariefService){}

    data: any[];
    Tarieven : IParkeertariefInfo;
    parkeerzones : gegevens[];
    ngOnInit(): void {
        this._svc.getTarief()
        .subscribe(result => this.extractData(result));
    
}
  

    extractData(result : IParkeertariefInfo){
        if (result!=null)
        {
            //console.log(result);
            this.data = result.data;

            let linelenght = 0;
            for(var i = 0; i < result.data.length; i++)
            {
                result.data[i].geometry2.coordinates.forEach(lines => linelenght += lines.length) //multiple lines in one coordinates[]
            }

            this.parkeerzones = new Array(6);

            let count =0;
            for(var i = 0; i < result.data.length; i++)
            {
                let kleur = false;


                for(var j = 0; j < this.parkeerzones.length; j++){
                    if (this.parkeerzones[j] == null){}
                    else if(this.parkeerzones[j].tariefkleur == result.data[i].tariefkleur ){
                        kleur = true;
                    }

                }
            
                if(!kleur   )
                {
                    this.parkeerzones[count] =
                        ({
                            
                            tariefkleur : result.data[i].tariefkleur,
                            starttarief : result.data[i].starttarief,
                            extra_tarief : result.data[i].extra_tarief,
                            maximum_parkeerduur : result.data[i].maximum_parkeerduur,
                            dagticket : result.data[i].dagticket

                        })
                        count++;      

                }  
            }



         
        }
        console.log(this.parkeerzones);

    }
}

            
         
             
 
  
    

export interface gegevens{
    tariefkleur : string,
    starttarief : string,
    extra_tarief : string,
    maximum_parkeerduur : string,
    dagticket : string
}