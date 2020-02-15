import { Component, OnInit } from '@angular/core';
import { book } from '../booking';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {catchError} from 'rxjs/operators';
import {BookingService} from '../Services/Booking.service';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  books:book[] = null;

  Book: book = {
    groupName: '',
    timeFrame: '',
    bookingStatus: '',
    clientName: '',
    location: '',
    review: '',
    score: null
  };

  constructor(private bookingservice: BookingService) { }

  findBookings(): void{
    this.bookingservice.getBooking()
    .then(response => this.books=response);
  }

  addBookings(): void{
    this.bookingservice.addBooking(this.Book);
  }

  ngOnInit(): void {
    
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
 }

}
