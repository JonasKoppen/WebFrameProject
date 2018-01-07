//External imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  NO_ERRORS_SCHEMA  } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';

import {AgmCoreModule} from '@agm/core'
import { HttpClientModule } from '@angular/common/http';


//Main items (home and main navigation)
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';


//Velo
import { VeloMapAllComponent } from './Velo/veloMapAll/veloMapAll.component';
import { VeloDataComponent } from './Velo/veloData/veloData.component';
import { VeloMapNearComponent } from './Velo/veloMapNear/veloMapNear.component';
import { WeatherComponent } from './Velo/weather/weather.component';
//service voor Velo
import { VeloService } from './services/velo.service';
<<<<<<< HEAD
import { HttpClientModule } from '@angular/common/http';
=======
import { WeatherService } from './services/weather.service';


//Car
>>>>>>> c49ef8633a599c3f69d41b9889b721dab683d466
import { TariefMapComponent } from './tarief/TariefMap/tariefMap.component';
import { TariefViewComponent } from './tarief/tariefView.component';
import { TariefDataComponent } from './tarief/TariefData/tariefData.component';
<<<<<<< HEAD
import { VeloComponent } from './jonas/velo.component';
import { CarpoolService } from './services/carpool.service';
import { TariefService } from './services/parkeertarief.service';
import { CarpoolmapComponent } from './carpool/CarpoolMap/carpoolmap.component';
import { CarpoolComponent } from './carpool/carpool.component';
import { CarpoolDataComponent } from './carpool/CarpoolData/carpooldata.component';
=======
import { CarpoolmapComponent } from './carpool/CarpoolMap/carpoolmap.component';
import { CarpoolDataComponent } from './carpool/CarpoolData/carpooldata.component';
import { CarpoolComponent } from './carpool/carpool.component';;
//service voor Car
import { CarpoolService } from './services/carpool.service';
import { TariefService } from './services/parkeertarief.service';
>>>>>>> c49ef8633a599c3f69d41b9889b721dab683d466


@NgModule({
  declarations: [
    //Main
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    NavbarComponent,
    //Velo
    VeloMapAllComponent,
    VeloDataComponent,
    VeloMapNearComponent,
    WeatherComponent,
    //Car
    CarpoolComponent,
    CarpoolComponent,
    CarpoolmapComponent,
    //Tarief
    TariefMapComponent,
    TariefViewComponent,
    TariefDataComponent,
<<<<<<< HEAD
    CarpoolDataComponent,
    CarpoolComponent
    
=======
>>>>>>> c49ef8633a599c3f69d41b9889b721dab683d466
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot([
      {path: "home", component : HomeComponent},
      {path: "carpool", component : CarpoolComponent},
      {path: "veloAll", component: VeloMapAllComponent},
      {path: "veloNear", component: VeloMapNearComponent},
      {path: "tarief", component: TariefViewComponent},
      {path: "", redirectTo:"home", pathMatch: 'full'},
      {path: "404", component: PageNotFoundComponent},
      {path : "**", redirectTo: "404"}
    ], {useHash:true}),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCiKlnD4BuX5sIWdAb0VYxZIs4-W6EEQdI'
    })
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    VeloService,
    CarpoolService,
<<<<<<< HEAD
    TariefService
=======
    TariefService,
    WeatherService
>>>>>>> c49ef8633a599c3f69d41b9889b721dab683d466
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
