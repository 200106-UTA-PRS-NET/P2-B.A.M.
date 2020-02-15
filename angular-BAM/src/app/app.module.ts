import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartpageComponent } from './startpage/startpage.component';
import {Observable} from 'rxjs/Rx';
import { MessagesComponent } from './messages/messages.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { PerformersMenuComponent } from './performers-menu/performers-menu.component';
import { PerformersComponent } from './performers/performers.component';

@NgModule({
  declarations: [
    AppComponent,
    StartpageComponent,
    MessagesComponent,
    CalculatorComponent,
    PerformersMenuComponent,
    PerformersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
