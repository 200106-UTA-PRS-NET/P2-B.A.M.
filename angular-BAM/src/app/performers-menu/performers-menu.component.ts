import { Component, OnInit } from '@angular/core';
import { PerformersService } from '../services/performers.service';
import { Performer } from '../performer';

@Component({
  selector: 'app-performers-menu',
  templateUrl: './performers-menu.component.html',
  styleUrls: ['./performers-menu.component.css']
})
export class PerformersMenuComponent implements OnInit {

 
  
  constructor(public performersService:PerformersService) { }

  ngOnInit(): void {
  }

}
