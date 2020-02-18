import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { CalculatorServiceService } from './calculatorservice.service';

describe('CalculatorServiceService', () => {
  let service: CalculatorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],

      providers: [CalculatorServiceService]});
    service = TestBed.inject(CalculatorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
