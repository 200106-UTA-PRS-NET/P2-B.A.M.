import { Component, OnInit, Input } from '@angular/core';
import { book } from '../booking';
import { bookpost } from '../bookpost';
import { bookput } from '../bookput';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {catchError} from 'rxjs/operators';
import {BookingService} from '../services/booking.service';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
@Input() currentBook : book;
@Input()   clientSelector: string;
@Input() groupSelector: string;

  books: book[] = null;
  clibooks: book[] = null;
  grobooks: book[] = null;

  bookSelector: number;
  idSelector: number;
  //clientSelector: string;
  putbookingId: number;
  putScore: number;
  editval: number;

  curWage: number;

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

  putBook: bookput = {
    //bookingId: null,
    groupName: null,
    timeFrame: null,
    bookingStatus: null,
    clientName: null,
    location: null,
    review: null,
    score: null
  }

  practiceBook: bookput = {
    //bookingId: null,
    groupName: null,
    timeFrame: null,
    bookingStatus: null,
    clientName: null,
    location: null,
    review:null,
    score: null,
  }
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
    //this.otherBook.bookingId = null;
    //this.otherBook.groupName = '';
    //this.otherBook.timeFrame = '';
    //this.otherBook.bookingStatus = '';
    //this.otherBook.clientName = '';
    //this.otherBook.location = '';
    //this.otherBook.review = '';
    //this.otherBook.score = null;
    this.bookingservice.getGroupBooking(this.groupSelector)
      .then(response => this.grobooks = response);
  }

  findClientBookings(): void {
    //this.otherBook.bookingId = null;
    //this.otherBook.groupName = '';
    //this.otherBook.timeFrame = '';
    //this.otherBook.bookingStatus = '';
   // this.otherBook.clientName = '';
   // this.otherBook.location = '';
   // this.otherBook.review = '';
   // this.otherBook.score = null;
    this.bookingservice.getVenueBooking(this.clientSelector)
      .then(response => this.clibooks = response);
  }

  addBookings(): void{
    this.bookingservice.postBooking(this.Book);
    this.currentBook = null;
  }

  addThisBooking(b:bookpost): void{
    this.bookingservice.postBooking(b);
  }
  changeBooking(): void {
    this.practiceBook.review = this.putBook.review;
    this.practiceBook.bookingStatus = this.putBook.bookingStatus;
    this.practiceBook.score = this.putBook.score;
    this.bookingservice.putBooking(this.practiceBook, this.putbookingId/*, this.putScore*/);//this.putBook.bookingId);
  }

  editor(): void {
    this.putbookingId = this.editval;
  }

  ngOnInit(): void {
    this.putbookingId = null;
    //this.putScore = null;
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
 }

}
