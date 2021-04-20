import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposeMeetingDateComponent } from './propose-meeting-date.component';

describe('ProposeMeetingDateComponent', () => {
  let component: ProposeMeetingDateComponent;
  let fixture: ComponentFixture<ProposeMeetingDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposeMeetingDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposeMeetingDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
