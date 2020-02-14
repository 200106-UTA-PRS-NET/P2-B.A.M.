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

  username : string;

  password : string;
  
  logins:login[] = null;

  Login: login = {
    username: '',
    location: 'Arlington',
    password: ''
  };



  choice(c:string): void {
    this.chosen = c;
  }

  

  constructor(private startpageservice: StartpageService) { }

  findVenues(): void{
    this.startpageservice.getClient()
    .then(response => this.logins=response);
  }
  register(): void{
    this.startpageservice.addClient(this.Login);
    this.chosen =  '';
  }

  ngOnInit(): void {
    this.username = "a";
    this.password = "b";
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
 }
}
