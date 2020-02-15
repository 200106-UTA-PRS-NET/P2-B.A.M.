import { Component, OnInit } from '@angular/core';
import { Performer} from '../performer';
import { PerformersService } from '../Services/performers.service';

@Component({
  selector: 'app-performers',
  templateUrl: './performers.component.html',
  styleUrls: ['./performers.component.css']
})
export class PerformersComponent implements OnInit {

  performersList: Performer[] = null;
  currPerformer: Performer = {
    groupName:'',
    perfomanceType: '',
    hourlyRate: 0,
    rating:'',
    groupPass:'',
    totalCost: null
  };

  //currently there is no performer signed in
  username:string = null;
  password:string = null;
  constructor(private perfomersService: PerformersService) { }

  ngOnInit(): void {
  }

  getPerformers(): void{
    this.perfomersService.getPerformers()
    .then(response => this.performersList = response);
  }


  
}
