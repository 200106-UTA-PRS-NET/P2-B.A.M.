import { Component, OnInit, Input } from '@angular/core';
import { login } from '../login';
import { Performer } from '../performer'
import { bookpost } from '../bookpost'
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {catchError} from 'rxjs/operators';
import {StartpageService} from '../Services/startpage.service';
import {PerformersService} from '../Services/performers.service';
import { Tag, TagWithId } from '../tag';
import { TagsService } from '../Services/tags.service';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.css']
})
export class VenueComponent implements OnInit {
  @Input() currentVenue: login;

  CurrentPerformer: Performer = null;
  tempstring:string;
  testPerformers : Performer[] = null;
  listPerformers : Performer[] = null;

  performerTags : TagWithId[] = null;

  bookingPage : boolean;

  sendBookingPage: boolean;
  genreSelector: string;
  ratingSelector: string;
  approved:boolean;

  currentBook :bookpost = {    
    groupName: '',
    timeFrame: '',
    bookingStatus: '',
    clientName: '',
    location: '',
  };

  constructor(private performerservice: PerformersService, private tagsServices: TagsService) { }


  findPerformers(): void{
    this.tempstring = "OK";
    this.sendBookingPage = false;
    this.CurrentPerformer = null;
    this.performerservice.getPerformers()
    .then(response => this.listPerformers = response);

    if(this.genreSelector != "" || this.ratingSelector != "")
    {
      this.tempstring = "O4K";
      this.testPerformers = [];
      for(let p of this.listPerformers)
      {
        this.approved = true;

        if(this.genreSelector != "")
        {
          if(p.performanceType != this.genreSelector)
          {
            this.approved = false;
          }
        }
        
        if(this.ratingSelector != "")
        {
          if(p.rating != this.ratingSelector)
          {
            this.approved = false;
          }
        } 

        if(this.approved == true)
        {
          this.testPerformers.push(p);
        }
      }
    }
    else
    {
      this.testPerformers = null;
      this.tempstring = "O2K";
      //this.listPerformers = this.tempPerformers;
      this.tempstring = "O3K";
    }
  }

  choosePerformer(p:Performer): void{
    
      this.sendBookingPage = false; 
      this.bookingPage = false;
      this.sendBookingPage = false;
      this.CurrentPerformer = p;
      this.currentBook.clientName = this.currentVenue.clientName;
      this.currentBook.location = this.currentVenue.location;
      this.currentBook.groupName = this.CurrentPerformer.groupName;
      this.currentBook.bookingStatus = "Upcoming";
      this.tagsServices.getTagsByGroupName(this.CurrentPerformer.groupName)
      .then(response => this.performerTags = response); 
      this.listPerformers = null;
  }

  viewHistory(): void{
    this.bookingPage = true;
    this.sendBookingPage = false;
    this.CurrentPerformer = null;
  }

  sendBook(): void{
    this.bookingPage = false;
    this.sendBookingPage = true;
    this.CurrentPerformer = null;
  }

  genreFilter(): void {
    
  }

  returnBooking(): void{
    this.bookingPage = false;
    this.sendBookingPage = false;
    this.genreSelector = "";
    this.ratingSelector = "";
  }

  ngOnInit(): void {
    this.tempstring = null;
    this.returnBooking();
  }

}
