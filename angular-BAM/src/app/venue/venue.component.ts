import { Component, OnInit, Input } from '@angular/core';
import { login } from '../login';
import { Performer } from '../performer'
import { bookpost } from '../bookpost'
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {catchError} from 'rxjs/operators';
import {StartpageService} from '../Services/startpage.service';
import {PerformersService} from '../Services/performers.service';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.css']
})
export class VenueComponent implements OnInit {
  @Input() currentVenue: login;

  CurrentPerformer: Performer = null;

  listPerformers : Performer[] = null;

  bookingPage : boolean;

  sendBookingPage : boolean;

  currentBook :bookpost = {    
    groupName: '',
    timeFrame: '',
    bookingStatus: '',
    clientName: '',
    location: '',
  };

  constructor(private performerservice: PerformersService) { }

  findPerformers(): void{
    this.performerservice.getPerformers()
    .then(response => this.listPerformers = response);
  }

  choosePerformer(p:Performer): void{
      this.bookingPage = false;
      this.sendBookingPage = false;
      this.CurrentPerformer = p;
      this.currentBook.clientName = this.currentVenue.clientName;
      this.currentBook.location = this.currentVenue.location;
      this.currentBook.groupName = this.CurrentPerformer.groupName;
      this.currentBook.bookingStatus = "Upcoming";
  }

  viewHistory(): void{
    this.bookingPage = true;
  }

  sendBook(): void{
    this.bookingPage = false;
    this.sendBookingPage = true;
  }

  ngOnInit(): void {
    this.bookingPage = false;
    this.sendBookingPage = false;
  }

}
