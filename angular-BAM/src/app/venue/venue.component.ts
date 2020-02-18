import { Component, OnInit, Input } from '@angular/core';
import { login } from '../login';
import { Performer } from '../performer'
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
  @Input() CurrentVenue: login;

  listPerformers : Performer[] = null;
  CurrentPerformer: Performer = null;
  bookingPage : boolean;
  constructor(private performerservice: PerformersService) { }

  findPerformers(): void{
    this.performerservice.getPerformers()
    .then(response => this.listPerformers = response);
  }

  choosePerformer(p:Performer): void{
      this.CurrentPerformer = p;
  }

  viewHistory(): void{
    this.bookingPage = true;
  }

  ngOnInit(): void {
    this.bookingPage = false;
  }

}
