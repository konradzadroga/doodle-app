import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AddProposedDateDTO, ProposedDateDTO } from 'src/app/model/date.model';
import { FindOccupiedDatesDTO, GetFreeTimeSlotsDTO, MeetingDTO } from 'src/app/model/meeting.model';
import { MeetingService } from 'src/app/services/meeting.service';
import { WaitingDialogComponent } from '../waiting-dialog/waiting-dialog.component';

@Component({
  selector: 'app-propose-meeting-date',
  templateUrl: './propose-meeting-date.component.html',
  styleUrls: ['./propose-meeting-date.component.scss']
})
export class ProposeMeetingDateComponent implements OnInit {

  formGroup!: FormGroup;
  dateCtrl = new FormControl();
  chosenUsernames: string[] = [];
  proposedStartDate!: Date;
  proposedStartDateString: string = '';
  proposedStartTime: number = -1;
  proposedEndTime: number = -1;
  proposedStartTimeIndex: number = -1;
  proposedEndTimeIndex: number = -1;
  proposedDateDTO!: AddProposedDateDTO;
  findOccupiedDatesDTO!: FindOccupiedDatesDTO;
  meetingId: number = -1;
  meeting!: MeetingDTO;
  meetingLoaded!: Promise<boolean>
  timeSlots!: any;
  timeSlotsLoaded!: Promise<boolean>
  lockAll: boolean = false;
  minDate = new Date();

  constructor(private dialog: MatDialog, private _formBuilder: FormBuilder, private _meetingService: MeetingService, private _router: Router, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      dateCtrl: ['', Validators.required]
    });
    this.refreshMeetingInfo();
  }

  showSnackbar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    })
  }

  refreshMeetingInfo() {
    let dialogRef: MatDialogRef<WaitingDialogComponent> = this.dialog.open(WaitingDialogComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    this._meetingService.currentMeetingId.subscribe(id => {
      this.meetingId = id;
      this._meetingService.getMeetingById(this.meetingId).subscribe(meeting => {
        this.meeting = meeting;
        this.meeting.users.forEach(user => {
          this.chosenUsernames.push(user.username);
          this.meetingLoaded = Promise.resolve(true);
          dialogRef.close();
        }
        );
        this.chosenUsernames.push(this.meeting.organizer.username);
      });
    })
  }


  public getFreeTimeSlots() {
    let dialogRef: MatDialogRef<WaitingDialogComponent> = this.dialog.open(WaitingDialogComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    this.proposedStartDate.setHours(this.proposedStartDate.getHours() + 1);
    this.proposedStartDateString = this.proposedStartDate.toString();
    this.findOccupiedDatesDTO = {
      date: this.proposedStartDate,
      usernames: this.chosenUsernames
    }

    this._meetingService.getFreeTimeSlots(this.findOccupiedDatesDTO).subscribe(timeSlots => {
      this.timeSlots = timeSlots;
      this.timeSlotsLoaded = Promise.resolve(true);
      dialogRef.close();
    })
  }

  selectTimeSlots(time: number, index: number) {
    if (this.proposedStartTime == -1) {
      this.proposedStartTime = time;
      this.proposedStartTimeIndex = index;
    } else {
      if (index <= this.proposedStartTimeIndex || this.proposedStartTimeIndex == 95) {
        alert('Nie możesz wybrać tej godziny zakończenia, ponieważ jest wcześniejsza niż godzina rozpoczęcia. Spróbuj ponownie.');
        this.clearTimeSlots();
      } else {
        let checkIfNoMeetingBetween: boolean = false;
        for (var i = this.proposedStartTimeIndex; i < index; i++) {
          if (this.timeSlots[i].timeSlotFree == false) {
            checkIfNoMeetingBetween = true;
            alert('Nie możesz wybrać tej godziny zakończenia, ponieważ pomiędzy godziną rozpoczęcia, a wybraną godziną zakończenia występuje inne spotkanie.');
            this.clearTimeSlots();
            break;
          }
        }
        if (checkIfNoMeetingBetween == false) {
          this.proposedEndTime = time;
          this.proposedEndTimeIndex = index;
          this.lockAll = true;
        }
      }

    }
  }

  clearTimeSlots() {
    this.proposedStartTime = -1;
    this.proposedEndTime = -1;
    this.proposedStartTimeIndex = -1;
    this.proposedEndTimeIndex = -1;
    this.lockAll = false;
  }

  addProposedDate() {
    let dialogRef: MatDialogRef<WaitingDialogComponent> = this.dialog.open(WaitingDialogComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    this.proposedDateDTO = {
      proposedStartDate: this.proposedStartDate,
      proposedStartTime: this.proposedStartTime,
      proposedEndTime: this.proposedEndTime
    }

    this._meetingService.addProposedDateToMeeting(this.meetingId, this.proposedDateDTO).subscribe(meeting => {
      dialogRef.close();
      this.showSnackbar("Pomyślnie dodano propozycję terminu.", "OK");
      this._router.navigate(['/home'])
    });
  }

}
