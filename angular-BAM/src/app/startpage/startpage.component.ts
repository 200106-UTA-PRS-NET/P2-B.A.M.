import { Component, OnInit } from '@angular/core';
import { login } from '../login';
import { Performer } from '../performer'
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {catchError} from 'rxjs/operators';
import {StartpageService} from '../Services/startpage.service';
import {PerformersService} from '../Services/performers.service';


@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})
export class StartpageComponent implements OnInit {
  chosen : string;

  chosen2:string;

  testingUsername : string;

  testingPassword : string;
  
  logins:login[] = null;

  VLogin: login = {
    clientName: '',
    location: '',
    clientPass: ''
  };

  PLogin: Performer = {
    groupName: '',
    performanceType: '',
    hourlyRate: 0,
    rating: '',
    groupPass:'',
    totalCost: 0
  };

  CurrentVenue: login = {
    clientName: '',
    location: '',
    clientPass: ''
  };

  CurrentPerformer: Performer = {
    groupName: '',
    performanceType: '',
    hourlyRate: 0,
    rating: '',
    groupPass:'',
    totalCost: 0
  };

  


  clearV():void
  {
    this.VLogin.clientName = '';
    this.VLogin.location = '';
    this.VLogin.clientPass = ''
  }
  clearP():void
  {
    this.PLogin.groupName = '';
    this.PLogin.performanceType = '';
    this.PLogin.hourlyRate = 0;
    this.PLogin.rating = '';
    this.PLogin.groupPass = '';
    this.PLogin.totalCost = 0;
  }
  choice(c:string): void {
    this.chosen = c;
    this.chosen2 = '';
    this.testingPassword = '';
    this.testingUsername = '';
    this.clearV();
    this.clearP();
  }

  secondChoice(c:string): void {
    this.chosen2 = c;
    this.clearV();
    this.clearP();
  }
  

  constructor(private startpageservice: StartpageService, private performersservice: PerformersService ) { }

  findVenues(): void{
    this.startpageservice.getClient()
    .then(response => this.logins=response);
  }

  findSpecificVenues(): void{
    this.CurrentVenue.clientName = '';
    this.CurrentVenue.location = '';
    this.CurrentVenue.clientPass = '';
    this.startpageservice.getSpecificClient(this.testingUsername)
    .then(response => this.CurrentVenue=response);
    // this.startpageservice.getSpecificClient(this.testingUsername)
    // .then(response => this.testLogin=response);
  }

  findPasswordVenues(): void{
    this.CurrentVenue.clientName = '';
    this.CurrentVenue.location = '';
    this.CurrentVenue.clientPass = '';
    if(this.testingPassword != "")
    {
      this.startpageservice.getPasswordClient(this.testingUsername, this.testingPassword)
      .then(response => this.CurrentVenue=response);
    }
    // this.startpageservice.getPasswordClient(this.testingUsername, this.testingPassword)
    // .then(response => this.testLogin=response);
  }
    findPasswordPerformer(): void{
      this.CurrentPerformer.groupName = '';
      this.CurrentPerformer.performanceType = '';
      this.CurrentPerformer.hourlyRate = 0;
      this.CurrentPerformer.rating = '';
      this.CurrentPerformer.groupPass = '';
      this.CurrentPerformer.totalCost = 0;
      if(this.testingPassword != "")
      {
        this.performersservice.signIn(this.testingUsername, this.testingPassword)
        .then(response => this.CurrentPerformer=response);
      }
    // this.startpageservice.getPasswordClient(this.testingUsername, this.testingPassword)
    // .then(response => this.testLogin=response);
  }


  register(): void{
    this.startpageservice.addClient(this.VLogin);
    this.chosen =  '';
    this.chosen2 = '';
  }

  registerP(): void{
    this.performersservice.postPerformer(this.PLogin);
    this.chosen =  '';
    this.chosen2 = '';
  }

  signUp(): void{
    if(this.testingPassword != "")
    {
      this.startpageservice.getPasswordClient(this.testingUsername, this.testingPassword);
    }
  }

  editVenue(): void{
    this.startpageservice.editClient(this.VLogin,this.testingUsername);
    this.chosen =  '';
    this.chosen2 = '';
  }

  ngOnInit(): void {
    this.testingUsername = '';
    this.testingPassword = '';
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
 }
}
