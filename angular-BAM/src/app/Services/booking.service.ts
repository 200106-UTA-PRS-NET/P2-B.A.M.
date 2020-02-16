import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { book } from '../booking';
import { bookput } from '../bookput';
import { bookpost } from '../bookpost';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from '../Services/message.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
 // BookUrl = 'https://localhost:44341/BAMAPI/Booking'
  BookUrl = 'https://bamapi.azurewebsites.net/BAMAPI/Booking';  // URL to web api
  newUrl = '';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

   /**GET: get bookings */
   getBooking():Promise<book[]>
   {
     return this.http.get<book[]>(this.BookUrl).toPromise();
   }

  /**GET: SPECIFIC booking(s) by id only*/
  getIdBooking(id: number): Promise<book> {
    this.newUrl = this.BookUrl + "/ById/" + id;
    return this.http.get<book>(this.newUrl)
      .toPromise();
  }

  /**GET: SPECIFIC booking(s) by performer name only*/
  getGroupBooking(group: string): Promise<book> {
    this.newUrl = this.BookUrl + "/ByPerformer/" + group;
    return this.http.get<book>(this.newUrl)
      .toPromise();
  }

  /**GET: SPECIFIC booking(s) by venue name only*/
  getVenueBooking(client: string): Promise<book> {
    this.newUrl = this.BookUrl + "/ByClient/" + client;
    return this.http.get<book>(this.newUrl)
      .toPromise();
  }

   /** POST: add a new booking to the database */
 postBooking(booking:bookpost): Promise<bookpost> 
 {
  return this.http.post<bookpost>(this.BookUrl, booking, this.httpOptions)
    .toPromise();
 }

  /** PUT: edit a booking in the database */
  putBooking(booking: bookput, bookingId: number): Promise<bookput> {
    this.newUrl = this.BookUrl + "/" + bookingId;
    return this.http.put<bookput>(this.newUrl, booking, this.httpOptions).toPromise();
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
