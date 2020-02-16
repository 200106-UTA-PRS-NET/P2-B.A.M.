import { Component, OnInit } from '@angular/core';
import { book } from '../booking';
import { bookpost } from '../bookpost';
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

  bookSelector: number;
  groupSelector: string;
  idSelector: number;
  clientSelector: string;

  Book: bookpost = {
    groupName: '',
    timeFrame: '',
    bookingStatus: '',
    clientName: '',
    location: ''
  };

  otherBook: book = {
    bookingId: null,
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

  findIdBookings(): void {
    this.otherBook.bookingId = null;
    this.otherBook.groupName = '';
    this.otherBook.timeFrame = '';
    this.otherBook.bookingStatus = '';
    this.otherBook.clientName = '';
    this.otherBook.location = '';
    this.otherBook.review = '';
    this.otherBook.score = null;
    this.bookingservice.getIdBooking(this.idSelector)
      .then(response => this.otherBook = response);
  }

  findGroupBookings(): void {
    this.otherBook.bookingId = null;
    this.otherBook.groupName = '';
    this.otherBook.timeFrame = '';
    this.otherBook.bookingStatus = '';
    this.otherBook.clientName = '';
    this.otherBook.location = '';
    this.otherBook.review = '';
    this.otherBook.score = null;
    this.bookingservice.getGroupBooking(this.groupSelector)
      .then(response => this.otherBook = response);
  }

  findClientBookings(): void {
    this.otherBook.bookingId = null;
    this.otherBook.groupName = '';
    this.otherBook.timeFrame = '';
    this.otherBook.bookingStatus = '';
    this.otherBook.clientName = '';
    this.otherBook.location = '';
    this.otherBook.review = '';
    this.otherBook.score = null;
    this.bookingservice.getVenueBooking(this.clientSelector)
      .then(response => this.otherBook = response);
  }

  addBookings(): void{
    this.bookingservice.postBooking(this.Book);
  }

  changeBooking(): void {
    this.bookingservice.putBooking(this.otherBook, this.bookSelector);
  }

  ngOnInit(): void {
    
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
 }

}
