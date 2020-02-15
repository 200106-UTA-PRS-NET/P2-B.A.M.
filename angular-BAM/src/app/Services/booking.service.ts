import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {book} from '../booking';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from '../Services/message.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  BookUrl = 'https://bamapi.azurewebsites.net/BAMAPI/Booking';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

   /**GET: get bookings */
   getBooking():Promise<book[]>
   {
     return this.http.get<book[]>(this.BookUrl).toPromise();
   }

   /** POST: add a new booking to the database */
 addBooking(booking:book): Promise<book> 
 {
  return this.http.post<book>(this.BookUrl, booking, this.httpOptions)
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
  //this.messageService.add(`HeroService: ${message}`);
}
}
