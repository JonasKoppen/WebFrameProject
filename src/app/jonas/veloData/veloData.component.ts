import { Component, Input } from "@angular/core";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { marker, VeloService } from "../../services/velo.service";

@Component({
    selector: 'app-veloData',
    templateUrl: './veloData.component.html',
    providers:[VeloService]
    }) 
export class VeloDataComponent implements OnInit
{
    title = 'velo';
    @Input() dichtBij: marker[]
    @Input() dichtBij2: marker[]
    constructor(private _svc : VeloService){}

    ngOnInit(): void {
    }
}