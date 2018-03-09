import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// myComponenet
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { GenerateurComponent } from './generateur/generateur.component';

// myServices
import { DataService } from './services/data.service';

// desgin
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from './material/material.module';
import { SideBarComponent } from './side-bar/side-bar.component';

// flexLaout
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { AcountComponent } from './acount/acount.component';
import { ChartComponent } from './chart/chart.component';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { ChartForMapComponent } from './chart-for-map/chart-for-map.component';
import { AccueilComponent } from './accueil/accueil.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapGenerateurComponent } from './map-generateur/map-generateur.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: AccueilComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'map',
        pathMatch: 'full'
      },
      {
        path: 'map',
        component: MapComponent
      },
      {
        path: 'generateur',
        component: GenerateurComponent
      }
    ]
  },
  { path: '**', component: AccueilComponent }
];
@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    AmChartsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [DataService],
  declarations: [
    AppComponent,
    MapComponent,
    GenerateurComponent,
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    LoginComponent,
    AcountComponent,
    ChartComponent,
    ChartForMapComponent,
    AccueilComponent,
    DashboardComponent,
    MapGenerateurComponent
  ],
  entryComponents: [ChartForMapComponent, MapGenerateurComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
