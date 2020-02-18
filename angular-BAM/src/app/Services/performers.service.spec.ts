import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { PerformersService } from './performers.service';

describe('PerformersService', () => {
  let service: PerformersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PerformersService]});
    service = TestBed.inject(PerformersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
