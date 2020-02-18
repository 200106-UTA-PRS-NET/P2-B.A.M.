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
import { PerformersComponent } from './performers/performers.component';
import { BookingComponent } from './booking/booking.component';
import { TagsComponent } from './tags/tags.component';
import { VenueComponent } from './venue/venue.component';

@NgModule({
  declarations: [
    AppComponent,
    StartpageComponent,
    MessagesComponent,
    CalculatorComponent,
    PerformersComponent,
    BookingComponent,
    TagsComponent,
    VenueComponent
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
