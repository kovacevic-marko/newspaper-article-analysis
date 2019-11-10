import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Moduli
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppGlobals } from './deljeno/app.global';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgBusyModule} from 'ng-busy';

// Servisi
import { AnalizaClankaService } from './servisi/analiza-clanka.service';

// Shared servisi
import { AnalizaClankaSharedService } from './shared-servisi/analiza-clanka-shared.service';

// Komponente
import { AppComponent } from './app.component';
import { AnalizaNovinskogClankaComponent } from './komponente/analiza-novinskog-clanka/analiza-novinskog-clanka.component';
import { UnosenjeTekstaComponent } from './komponente/analiza-novinskog-clanka/unosenje-teksta/unosenje-teksta.component';
import { RezultatAnalizeComponent } from './komponente/analiza-novinskog-clanka/rezultat-analize/rezultat-analize.component';
import { HeaderComponent } from './komponente/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    AnalizaNovinskogClankaComponent,
    UnosenjeTekstaComponent,
    RezultatAnalizeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    NgBusyModule
  ],
  providers: [
    AnalizaClankaService,
    AnalizaClankaSharedService,
    AppGlobals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
