import { Component, OnInit } from '@angular/core';
import { TokenStorage } from 'src/app/auth/token.storage';
import { MeetingDTO } from 'src/app/model/meeting.model';
import { MeetingService } from 'src/app/services/meeting.service';

@Component({
  selector: 'app-my-meetings',
  templateUrl: './my-meetings.component.html',
  styleUrls: ['./my-meetings.component.scss']
})
export class MyMeetingsComponent implements OnInit {

  username: string = '';
  meetings!: MeetingDTO[];
  meetingsLoaded!: Promise<boolean>;

  constructor(private _meetingService: MeetingService, private _tokenStorage: TokenStorage) { }

  ngOnInit(): void {
    this.username = this._tokenStorage.getUsername();
    this.getCurrentUserMeetings(this.username);
  }

  getCurrentUserMeetings(username: string): void {
    this._meetingService.getAllMeetingsByOrganizer(username).subscribe(meetings => {
      this.meetings = meetings;
      this.meetingsLoaded = Promise.resolve(true);
    })
  }


}
