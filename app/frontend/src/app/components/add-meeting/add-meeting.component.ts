import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TokenStorage } from 'src/app/auth/token.storage';
import { UserDTO } from 'src/app/model/user.model';
import { MeetingService } from 'src/app/services/meeting.service';
import { UserService } from 'src/app/services/user.service';
import { AddMeetingDTO, FindOccupiedDatesDTO, GetFreeTimeSlotsDTO } from '../../model/meeting.model';
import { WaitingDialogComponent } from '../waiting-dialog/waiting-dialog.component';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.scss']
})
export class AddMeetingComponent implements OnInit {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  usernameControl = new FormControl();
  myUsername: string = "";
  name: string = "";
  location: string = "";
  description: string = "";
  usernameInput: string = "";
  usernames: string[] = [];
  tempUsernames: string[] = [];
  chosenUsernames: string[] = [];
  filteredUsernames!: Observable<string[]>;
  chosenUsername: string = "";
  chosenUser!: UserDTO;
  userChosen!: Promise<boolean>
  nickStartsWith: string = "";
  proposedStartDate!: Date;
  proposedStartDateString: string = '';
  proposedStartTime: number = -1;
  proposedEndTime: number = -1;
  proposedStartTimeIndex: number = -1;
  proposedEndTimeIndex: number = -1;
  addMeetingDTO!: AddMeetingDTO;
  findOccupiedDatesDTO!: FindOccupiedDatesDTO;
  timeSlots!: any;
  timeSlotsLoaded!: Promise<boolean>
  lockAll: boolean = false;
  minDate = new Date();

  constructor(private dialog: MatDialog, private _formBuilder: FormBuilder, private _userService: UserService, private _meetingService: MeetingService, 
    private _router: Router, private _tokenStorage: TokenStorage, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required],
      locationCtrl: ['', Validators.required],
      descriptionCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      dateCtrl: ['', Validators.required]
    });
    this.getAllUsernames();
    this.filteredUsernames = this.usernameControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.myUsername = this._tokenStorage.getUsername();
  }

  addUser(username: string) {
    this.userChosen = Promise.resolve(false);
    this.usernames = this.usernames.filter(item => item != username);
    this.tempUsernames = this.tempUsernames.filter(item => item != username);
    this.chosenUsernames.push(username);
  }

  removeUser(username: string) {
    this.chosenUsernames = this.chosenUsernames.filter(item => item != username);
    this.usernames.push(username)
  }

  getUserInformation(username: string) {
    let dialogRef: MatDialogRef<WaitingDialogComponent> = this.dialog.open(WaitingDialogComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    this.chosenUsername = username;
    this._userService.getUserByUsername(username).subscribe(user => {
      this.chosenUser = user;
      this.userChosen = Promise.resolve(true);
      dialogRef.close();
    })
  }

  getAllUsernames(): void {
    let dialogRef: MatDialogRef<WaitingDialogComponent> = this.dialog.open(WaitingDialogComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    this._userService.getAllUsernames().subscribe(usernames => {
      this.usernames = usernames;
      dialogRef.close();
    });
  }

  filterUsernames() {
    this.tempUsernames = this.usernames
    this.usernames = this.usernames.filter((username) => username.startsWith(this.usernameControl.value));
  }

  clearFilter() {
    if (this.tempUsernames.length != 0) {
      this.usernames = this.tempUsernames;
    }
  }

  showSnackbar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    })
  }

  addMeeting() {
    let dialogRef: MatDialogRef<WaitingDialogComponent> = this.dialog.open(WaitingDialogComponent, {
      panelClass: 'transparent',
      disableClose: true
    });

    this.chosenUsernames.push(this.myUsername);

    this.addMeetingDTO = {
      name: this.name,
      location: this.location,
      description: this.description,
      usernames: this.chosenUsernames,
      proposedStartDate: this.proposedStartDate,
      proposedStartTime: this.proposedStartTime,
      proposedEndTime: this.proposedEndTime
    }

    this._meetingService.addMeeting(this.addMeetingDTO).subscribe(meeting => {
      dialogRef.close();
      this.showSnackbar("Spotkanie zostało dodane", "OK");
      this._router.navigate(['/home']);
    });
  }

  public getFreeTimeSlots() {
    this.chosenUsernames.push(this.myUsername);
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
      this.chosenUsernames = this.chosenUsernames.filter((username) => !username.startsWith(this.myUsername));
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


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.usernames.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

}
