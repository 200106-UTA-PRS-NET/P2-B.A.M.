import { Component, OnInit } from '@angular/core';
import { Calc } from '../calc';
import { CalculatorServiceService } from '../services/calculatorservice.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  calc: Calc ={
    operation: "simplify",
    expression: null,
    result: null
  }

  hours:number;

  constructor(public caculatorService: CalculatorServiceService) { }

  ngOnInit(): void {
    this.hours = null;
  }

  totalWages(): void{
    this.caculatorService.getResult(this.calc.operation, this.calc.expression)
    .then(response=>this.calc.result = response.result);
  }

  result(): void{
    this.caculatorService.getResult(this.calc.operation, this.calc.expression)
      .then(response=>this.calc.result = response.result);
  } 

}
