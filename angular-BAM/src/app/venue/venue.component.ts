import { Component, OnInit } from '@angular/core';
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
  CurrentVenue: login= {
    clientName: '',
    location: '',
    clientPass: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

}
