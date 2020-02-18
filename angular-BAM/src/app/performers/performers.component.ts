import { Component, OnInit, Input } from '@angular/core';
import { Performer} from '../performer';
import { PerformersService } from '../Services/performers.service';
import { TagsService } from '../Services/tags.service';
import { Tag, TagWithId } from '../tag';

@Component({
  selector: 'app-performers',
  templateUrl: './performers.component.html',
  styleUrls: ['./performers.component.css']
})
export class PerformersComponent implements OnInit {
 
  @Input() currPerformer: Performer;
  editYourTags: boolean = false;
  viewBookings: boolean = false;
  bookingHistory: boolean = false;
  yourInfo: boolean = false;
  updateInfo: boolean = false;
  cancelBooking: boolean = false;

  performerTagsList: TagWithId[] = null;

  performersList: Performer[] = null;

  tempPerformer: Performer = {
    groupName: null,
    performanceType: null,
    hourlyRate: null,
    groupPass: null,
    rating: null,
    totalCost: null
  };
  
  constructor(private perfomersService: PerformersService, public tagsServices: TagsService) { }

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

  //////////
  editTags(): void{
    this.tagsServices.getTagsByGroupName(this.currPerformer.groupName)
    .then(response => this.performerTagsList = response);
    this.editYourTags = true;
   
  }

  ViewBooking(): void {
    
  }



  back(): void {
    this.editYourTags = false;
    this.viewBookings = false;
    this.bookingHistory = false;
    this.yourInfo = false;
    this.updateInfo = false;
    this.cancelBooking = false;
  }
}
