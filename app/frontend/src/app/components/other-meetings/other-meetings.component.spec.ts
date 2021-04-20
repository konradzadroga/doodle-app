import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherMeetingsComponent } from './other-meetings.component';

describe('OtherMeetingsComponent', () => {
  let component: OtherMeetingsComponent;
  let fixture: ComponentFixture<OtherMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherMeetingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
