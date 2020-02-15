import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformersMenuComponent } from './performers-menu.component';

describe('PerformersMenuComponent', () => {
  let component: PerformersMenuComponent;
  let fixture: ComponentFixture<PerformersMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
