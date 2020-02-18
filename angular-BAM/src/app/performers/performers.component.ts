import { Component, OnInit, Input } from '@angular/core';
import { Performer} from '../performer';
import { PerformersService } from '../Services/performers.service';
import { TagsService } from '../Services/tags.service';
import { Tag, TagWithId } from '../tag';
import { BookingService } from '../Services/Booking.service';
import { book } from '../booking';
import { bookput } from '../bookput'

@Component({
  selector: 'app-performers',
  templateUrl: './performers.component.html',
  styleUrls: ['./performers.component.css']
})
export class PerformersComponent implements OnInit {
 
  @Input() currPerformer: Performer;
  editYourTags: boolean = false;
  viewBookings: boolean = false;
  viewCompletedBookings: boolean = false;
  bookingHistory: boolean = false;
  yourInfo: boolean = false;
  updateInfo: boolean = false;
  cancelBooking: boolean = false;

  //this is for cancelling a booking
  selectedBookingId: number;
  selectedBooking: book = null;
  /////

  performerTagsList: TagWithId[] = null;
  performersList: Performer[] = null;
  performerBookings: book[] = null;


  tempPerformer: Performer = {
    groupName: null,
    performanceType: null,
    hourlyRate: null,
    groupPass: null,
    rating: null,
    totalCost: null
  };
  
  constructor(private perfomersService: PerformersService, public tagsServices: TagsService, private bookingservice: BookingService) { }

  ngOnInit(): void {
  }

  getPerformers(): void{
    this.perfomersService.getPerformers()
    .then(response => this.performersList = response);
  }
  getPerformerByName(): void{
    this.perfomersService.getPerformerByName(this.currPerformer.groupName)
    .then(response => this.tempPerformer = response);
   
  } 
 

  updatePerformer(): void{
    this.perfomersService.putPerformer(this.currPerformer.groupName, this.currPerformer);
  }

  ConfirmCancel(): void {
    this.selectedBookingId = this.selectedBooking.bookingId;
    var bookPut: bookput = {
      groupName: null,
      timeFrame: null,
      bookingStatus: 'Cancelled',
      clientName: null,
      location: null,
      review: null,
      score: null
    };
    this.bookingservice.putBooking(bookPut, this.selectedBookingId);
  }


  //////////
  editTags(): void{
    this.tagsServices.getTagsByGroupName(this.currPerformer.groupName)
    .then(response => this.performerTagsList = response);
    this.editYourTags = true;
    this.viewBookings = false;
    this.viewCompletedBookings = false;
    this.bookingHistory = false;
    this.yourInfo = false;
    this.updateInfo = false;
    this.cancelBooking = false;
    this.performerTagsList = null;
   
  }

  ViewBooking(): void {
    this.bookingservice.getGroupBookingByStatus(this.currPerformer.groupName, "Upcoming")
    .then(response => this.performerBookings = response);
    
    
    this.editYourTags = false;
    this.viewBookings = true;
    this.viewCompletedBookings = false;
    this.bookingHistory = false;
    this.yourInfo = false;
    this.updateInfo = false;
    this.cancelBooking = false;
    
  }

  ViewCompletedBookings(): void {
    this.bookingservice.getGroupBookingByStatus(this.currPerformer.groupName, "Completed")
    .then(response => this.performerBookings = response);
   
   
    

    this.editYourTags = false;
    this.viewBookings = false;
    this.viewCompletedBookings = true;
    this.bookingHistory = false;
    this.yourInfo = false;
    this.updateInfo = false;
    this.cancelBooking = false;
   
  }

  BookingHistory(): void {
    this.bookingservice.getGroupBooking(this.currPerformer.groupName)
    .then(response => this.performerBookings = response);
    this.editYourTags = false;
    this.viewBookings = false;
    this.viewCompletedBookings = false;
    this.bookingHistory = true;
    this.yourInfo = false;
    this.updateInfo = false;
    this.cancelBooking = false;
    
  }

  YourInfo(): void {
    this.editYourTags = false;
    this.viewBookings = false;
    this.viewCompletedBookings = false;
    this.bookingHistory = false;
    this.yourInfo = true;
    this.updateInfo = false;
    this.cancelBooking = false;
    this.performerTagsList = null;
  }

  UpdateInfo(): void {
    this.editYourTags = false;
    this.viewBookings = false;
    this.viewCompletedBookings = false;
    this.bookingHistory = false;
    this.yourInfo = false;
    this.updateInfo = true;
    this.cancelBooking = false;
    this.performerTagsList = null;
  }

  CancelBooking(): void {
    this.bookingservice.getGroupBooking(this.currPerformer.groupName)
    .then(response => this.performerBookings = response);
   
    this.editYourTags = false;
    this.viewBookings = false;
    this.viewCompletedBookings = false;
    this.bookingHistory = false;
    this.yourInfo = false;
    this.updateInfo = false;
    this.cancelBooking = true;

  }


  back(): void {
    this.editYourTags = false;
    this.viewBookings = false;
    this.viewCompletedBookings = false;
    this.bookingHistory = false;
    this.yourInfo = false;
    this.updateInfo = false;
    this.cancelBooking = false;
    this.performerBookings = null;
  }
}
