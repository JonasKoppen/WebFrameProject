import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  NO_ERRORS_SCHEMA  } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import {AgmCoreModule} from '@agm/core'
import { VeloMapComponent } from './jonas/veloMap/veloMap.component';
import { VeloService } from './services/velo.service';
import { HttpClientModule } from '@angular/common/http';
import { CarpoolComponent } from './carpool/carpool.component';
import { CarpoolService } from './services/carpool.service';
<<<<<<< HEAD
import { TariefMapComponent } from './tarief/TariefMap/tariefMap.component';
import { TariefService } from './services/parkeertarief.service';
import { VeloComponent } from './jonas/velo.component';
import { VeloDataComponent } from './jonas/veloData/veloData.component';
import { TariefViewComponent } from './tarief/tariefView.component';
import { TariefDataComponent } from './tarief/TariefData/tariefData.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    NavbarComponent,
    VeloMapComponent,
    CarpoolComponent,
    VeloDataComponent,
    VeloMapComponent,
    VeloComponent,
    CarpoolComponent,
<<<<<<< HEAD
    TariefMapComponent,
    TariefViewComponent,
    TariefDataComponent
    
=======
    TariefComponent,
    WeatherComponent 
>>>>>>> a6384982fa230ac1026501ae1f59381eaf8e38ea
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot([
      {path : "", redirectTo: "404", pathMatch: "full"},
      {path: "404", component: PageNotFoundComponent},
      {path: "home", component : HomeComponent},
      {path: "carpool", component : CarpoolComponent},
      {path: "velo", component: VeloComponent},
      {path: "tarief", component: TariefViewComponent}
    
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
>>>>>>> a6384982fa230ac1026501ae1f59381eaf8e38ea
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
