import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  NO_ERRORS_SCHEMA  } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import {AgmCoreModule} from '@agm/core'
import { VeloService } from './services/velo.service';
import { HttpClientModule } from '@angular/common/http';
import { CarpoolComponent } from './carpool/carpool.component';
import { CarpoolService } from './services/carpool.service';
import { TariefMapComponent } from './tarief/TariefMap/tariefMap.component';
import { TariefService } from './services/parkeertarief.service';
import { TariefViewComponent } from './tarief/tariefView.component';
import { TariefDataComponent } from './tarief/TariefData/tariefData.component';
import { WeatherService } from './services/weather.service';
import { VeloMapAllComponent } from './Velo/veloMapAll/veloMapAll.component';
import { VeloDataComponent } from './Velo/veloData/veloData.component';
import { VeloMapNearComponent } from './Velo/veloMapNear/veloMapNear.component';
import { WeatherComponent } from './Velo/weather/weather.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    NavbarComponent,
    VeloMapAllComponent,
    CarpoolComponent,
    VeloDataComponent,
    VeloMapNearComponent,
    CarpoolComponent,
    TariefMapComponent,
    TariefViewComponent,
    TariefDataComponent,
    WeatherComponent,
    VeloDataComponent

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
      {path : "", redirectTo: "404", pathMatch: "full"},
      {path: "404", component: PageNotFoundComponent},
    
    ], {useHash:true}),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCiKlnD4BuX5sIWdAb0VYxZIs4-W6EEQdI'
    })
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    VeloService,
    CarpoolService,
    TariefService,
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
