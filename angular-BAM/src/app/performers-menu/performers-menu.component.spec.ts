import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformersMenuComponent } from './performers-menu.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('PerformersMenuComponent', () => {
  let component: PerformersMenuComponent;
  let fixture: ComponentFixture<PerformersMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ PerformersMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformersMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
