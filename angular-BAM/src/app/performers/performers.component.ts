import { Component, OnInit } from '@angular/core';
import { Performer} from '../performer';
import { PerformersService } from '../services/performers.service';

@Component({
  selector: 'app-performers',
  templateUrl: './performers.component.html',
  styleUrls: ['./performers.component.css']
})
export class PerformersComponent implements OnInit {
 
  performersList: Performer[] = null;

  currPerformer: Performer = null;

  tempPerformer: Performer = {
    groupName: null,
    performanceType: null,
    hourlyRate: null,
    groupPass: null,
    rating: null,
    totalCost: null
  };
  
  choice: string = '';
  clearForm: boolean = false; 
  //currently there is no performer signed in
  username:string = '';
  password:string = '';
  constructor(private perfomersService: PerformersService) { }

  ngOnInit(): void {
  }

  getPerformers(): void{
    this.perfomersService.getPerformers()
    .then(response => this.performersList = response);
  }
  getPerformerByName(): void{
    this.perfomersService.getPerformerByName(this.username)
    .then(response => this.tempPerformer = response);
   
  } 
  signIn(): void {
    this.perfomersService.signIn(this.username, this.password)
    .then(response => this.currPerformer = response);
  }

  signUp(): void { //post a performer
    this.perfomersService.postPerformer(this.tempPerformer);
    
  }

  updatePerformer(): void{
    this.perfomersService.putPerformer(this.currPerformer.groupName, this.currPerformer);
  }


  selectOption(choice:string): void {
    this.choice = choice;
  }
  

}
