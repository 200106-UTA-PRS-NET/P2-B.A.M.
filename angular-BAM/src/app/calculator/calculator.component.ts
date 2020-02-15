import { Component, OnInit } from '@angular/core';
import { Calc } from '../calc';
import { CalculatorServiceService } from '../Services/calculator-service.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  calc: Calc ={
    operation: null,
    expression: null,
    result: null
  }

  

  constructor(public caculatorService: CalculatorServiceService) { }

  ngOnInit(): void {
  }

  result(): void{
    this.caculatorService.getResult(this.calc.operation, this.calc.expression)
      .then(response=>this.calc.result = response.result);
  } 

}