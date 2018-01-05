import { Component, Input } from "@angular/core";
import { marker } from "../services/velo.service";

@Component({
    selector: 'app-velo',
    templateUrl: './velo.component.html'
    }) 
export class VeloComponent
{
    title = 'velo';
    @Input() dichtBij: marker[];
    @Input() dichtBij2: marker[];
}