import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorage } from 'src/app/auth/token.storage';
import { MeetingDTO } from 'src/app/model/meeting.model';
import { GetVotesDTO } from 'src/app/model/vote.model';
import { MeetingService } from 'src/app/services/meeting.service';
import { VoteService } from 'src/app/services/vote.service';
import { WaitingDialogComponent } from '../waiting-dialog/waiting-dialog.component';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit {

  panelOpenState = false;

  @Input()
  meeting!: MeetingDTO;
  myUsername: string = '';
  votes: GetVotesDTO[] = [];
  dateVotes: string[] = [];

  constructor(private dialog: MatDialog, private _meetingService: MeetingService, private _voteService: VoteService, private _tokenStorage: TokenStorage, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.myUsername = this._tokenStorage.getUsername();
    this.getVotesForProposedDates();
  }

  getVotesForProposedDates() {
    let dialogRef: MatDialogRef<WaitingDialogComponent> = this.dialog.open(WaitingDialogComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    this.meeting.proposedDateDTOs.forEach(proposedDate => {
      this._voteService.getVotesForProposedDate(proposedDate.id).subscribe(
        vote => {
          this.dateVotes[vote.proposedDateId.toString()] = vote.usersWhoVoted;
          dialogRef.close();
        }
      )
    });
  }

  setMeetingAsConfirmed(meetingId: number, proposedDateId: number) {
    let dialogRef: MatDialogRef<WaitingDialogComponent> = this.dialog.open(WaitingDialogComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    this._meetingService.setMeetingAsConfirmed(meetingId, proposedDateId).subscribe(meeting => {
      this.meeting = meeting;
      this.getVotesForProposedDates();
      dialogRef.close();
      this.showSnackbar("Termin został potwierdzony.", "OK");
    })
  }

  vote(id: number) {
    this._voteService.addVote(id).subscribe(vote => {
      console.log(vote);
      this.getVotesForProposedDates();
    })
  }

  public setMeetingId(meetingId: number) {
    this._meetingService.changeMeetingId(meetingId);
  }

  showSnackbar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    })
  }

}
