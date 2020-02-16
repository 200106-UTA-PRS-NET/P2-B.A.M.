import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Performer } from '../performer';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PerformersService {

  url = 'https://bamapi.azurewebsites.net/BAMAPI/Performers';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }) //send the object as JSON
  };

  constructor(private http: HttpClient) { }

  //get all performers
  getPerformers(): Promise<Performer[]>{
    return this.http.get<Performer[]>(this.url).toPromise();
  }

  //get a specific performer
  getPerformerByName(groupName:string): Promise<Performer>{
    return this.http.get<Performer>(`${this.url}/${groupName}`).toPromise();
  }

  //input your credetials to sign in
  signIn(groupName:string, groupPass:string): Promise<Performer> {
    return this.http.get<Performer>(`${this.url}/${groupName}/${groupPass}`).toPromise();
  }

  //create a performer
  postPerformer(performer:Performer): Promise<Performer>{
    return this.http.post<Performer>(this.url, performer, this.httpOptions).toPromise();
  }

  //update a performer
  putPerformer(groupName: string, performer:Performer): Promise<Performer>{
    return this.http.put<Performer>(`${this.url}/${groupName}`, performer, this.httpOptions).toPromise();
  }  
}
