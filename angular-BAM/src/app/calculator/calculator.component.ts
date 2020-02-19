import { Component, OnInit, Input } from '@angular/core';
import { Calc } from '../calc';
import { CalculatorServiceService } from '../Services/calculatorservice.service';
import { Performer} from '../performer';
import { PerformersService } from '../Services/performers.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
@Input() pName:string;

  calc: Calc ={
    operation: "simplify",
    expression: null,
    result: null
  }

  hours:number;
  hourly:number;
  temp:number=0;

  foundPerformer: Performer = {
    groupName: '',
    performanceType: '',
    hourlyRate: 0,
    rating: '',
    groupPass:'',
    totalCost: 0
  };

  constructor(public caculatorService: CalculatorServiceService, private performersService: PerformersService ) { }

  ngOnInit(): void {
    this.hours = null;
    this.performersService.getPerformerByName(this.pName)
    .then(response => this.foundPerformer = response);
  }

  totalWages(): void{
    this.hourly = this.foundPerformer.hourlyRate;

    this.calc.expression = this.hourly+"*"+this.hours; 

    this.caculatorService.getResult(this.calc.operation, this.calc.expression)
    .then(response=>this.temp = +response.result);
  }

  submitWages(): void{
    this.foundPerformer.totalCost = this.foundPerformer.totalCost +this.temp;
    this.performersService.putPerformer(this.foundPerformer.groupName, this.foundPerformer);
  }
  result(): void{
    this.caculatorService.getResult(this.calc.operation, this.calc.expression)
      .then(response=>this.calc.result = response.result);
  } 

}
