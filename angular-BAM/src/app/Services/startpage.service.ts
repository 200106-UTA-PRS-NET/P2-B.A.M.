import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {login} from '../login';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})

export class StartpageService 
{
  clientsUrl = 'https://localhost:44341/BAMAPI/Venue';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /**GET: get venues */
  getClient():Promise<login[]>
  {
    return this.http.get<login[]>(this.clientsUrl).toPromise();
  }

 /** POST: add a new client to the database */
 addClient(client:login): Promise<login> 
 {
  return this.http.post<login>(this.clientsUrl, client, this.httpOptions)
    .toPromise();
}

private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
private log(message: string) {
  this.messageService.add(`HeroService: ${message}`);
}
}


  
