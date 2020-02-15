import { Component, OnInit } from '@angular/core';
import { login } from '../login';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {catchError} from 'rxjs/operators';
import {StartpageService} from '../startpage.service';


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

  Login: login = {
    clientName: '',
    location: 'Arlington',
    clientPass: ''
  };

  testLogin: login = {
    clientName: '',
    location: '',
    clientPass: ''
  };

  choice(c:string): void {
    this.chosen = c;
    this.chosen2 = '';
    this.Login.location = '';
    this.Login.clientPass = ''
  }

  secondChoice(c:string): void {
    this.chosen2 = c;
    this.Login.clientName = '';
    this.Login.location = '';
    this.Login.clientPass = ''
  }
  

  constructor(private startpageservice: StartpageService) { }

  findVenues(): void{
    this.startpageservice.getClient()
    .then(response => this.logins=response);
  }

  findSpecificVenues(): void{
    this.testLogin.clientName = '';
    this.testLogin.location = '';
    this.testLogin.clientPass = '';
    this.startpageservice.getSpecificClient(this.testingUsername)
    .then(response => this.testLogin=response);
    // this.startpageservice.getSpecificClient(this.testingUsername)
    // .then(response => this.testLogin=response);
    //this.testLogin.clientPass = "REDACTED: OBTAINED WITHOUT USING PASSWORD";
  }

  findPasswordVenues(): void{
    this.testLogin.clientName = '';
    this.testLogin.location = '';
    this.testLogin.clientPass = '';
    this.startpageservice.getPasswordClient(this.testingUsername, this.testingPassword)
    .then(response => this.testLogin=response);
    // this.startpageservice.getPasswordClient(this.testingUsername, this.testingPassword)
    // .then(response => this.testLogin=response);
  }


  register(): void{
    this.startpageservice.addClient(this.Login);
    this.chosen =  '';
    this.chosen2 = '';
  }

  editVenue(): void{
    this.startpageservice.editClient(this.Login,this.testingUsername);
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
