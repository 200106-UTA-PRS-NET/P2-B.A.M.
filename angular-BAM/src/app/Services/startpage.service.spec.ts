import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { StartpageService } from './startpage.service';

describe('StartpageService', () => {
  let service: StartpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StartpageService]});
    service = TestBed.inject(StartpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
