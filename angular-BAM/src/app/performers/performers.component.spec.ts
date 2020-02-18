import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformersComponent } from './performers.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { HttpClient, HttpErrorResponse } from '@angular/common/http';



describe('PerformersComponent', () => {
  let component: PerformersComponent;
  let fixture: ComponentFixture<PerformersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ PerformersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
