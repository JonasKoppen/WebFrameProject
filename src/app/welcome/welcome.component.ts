import { Component } from '@angular/core';
import { debug } from 'util';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { validateConfig } from '@angular/router/src/config';


@Component({
selector: 'app-welcome',
templateUrl: './welcome.component.html',
}) 
export class WelcomeComponent implements OnInit{

    imageUrl : string;
    title = 'WelcomeComponent';
    images : number[] = [1,2];
    private _nr : number = 1;

    btnContent = "Press me!";
    btnCounter = 0;

    constructor(){
    }

    ngOnInit(){
        this.buildPictureList();
        this.SetImage();
        setInterval(this.ChangeImage , 10000);
    }

    ChangeImage = () =>
    {
        this._nr = this.images[Math.round(Math.random()*(this.images.length - 1))];
        this.SetImage()
    }

    get imageNr()
    {
        return this._nr
    }

    set imageNr(value : number)
    {
        this._nr = value,
        this.SetImage();
    }

    SetImage(){
        this.imageUrl = `img%20(${this._nr}).jpg`;
    }

    update(){
        this.imageUrl = 'img%20(' + (Math.round(Math.random()*152)) + ').jpg'
    }


    newPicture(event: KeyboardEvent) : void {
        if(event.keyCode == 69){
            this.update();
        }
    }

    buildPictureList(){
        this.images = new Array(150);
        for(let i = 1; i < 151; i++){
            this.images[i] = i;
        }
        
    }

    btnClick(){
        this.btnCounter ++ ;
        if(this.btnCounter>1){
            this.btnContent = "You Pressed met: " + this.btnCounter + " times."
        }
        else{
            this.btnContent = "Do not press me!"
        }
        if(this.btnCounter > 50){
            this.btnContent = "Stop pressing ME!!!!"
        }
        
    }
}
