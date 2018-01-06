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
import { TariefMapComponent } from './tarief/TariefMap/tariefMap.component';
import { VeloDataComponent } from './jonas/veloData/veloData.component';
import { TariefViewComponent } from './tarief/tariefView.component';
import { TariefDataComponent } from './tarief/TariefData/tariefData.component';
import { VeloComponent } from './jonas/velo.component';
import { CarpoolService } from './services/carpool.service';
import { TariefService } from './services/parkeertarief.service';
import { CarpoolmapComponent } from './carpool/CarpoolMap/carpoolmap.component';
import { CarpoolDataComponent } from './carpool/CarpoolData/carpooldata.component';
import { CarpoolComponent } from './carpool/carpool.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    NavbarComponent,
    VeloMapComponent,
    VeloDataComponent,
    VeloMapComponent,
    VeloComponent,
    CarpoolmapComponent,
    TariefMapComponent,
    TariefViewComponent,
    TariefDataComponent,
    CarpoolDataComponent,
    CarpoolComponent
    
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
    TariefService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
