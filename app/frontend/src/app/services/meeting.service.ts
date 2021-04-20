import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AddProposedDateDTO, ProposedDateDTO } from "../model/date.model";
import { AddMeetingDTO, MeetingDTO, FindOccupiedDatesDTO } from '../model/meeting.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MeetingService {

  url: string = 'http://value_goes_here:8080/meetings/'

  private meetingIdSource = new BehaviorSubject<number>(-1);

  currentMeetingId: Observable<number> = this.meetingIdSource.asObservable();


  constructor(private httpClient: HttpClient) { }

  public changeMeetingId(id: number) {
    this.meetingIdSource.next(id);
  }

  public getAllMeetingsByUser(username: string): Observable<MeetingDTO[]> {
    return this.httpClient.get<MeetingDTO[]>(this.url + "user/" + username);
  }

  public getAllMeetingsByOrganizer(username: string): Observable<MeetingDTO[]> {
    return this.httpClient.get<MeetingDTO[]>(this.url + "organizer/" + username);
  }

  public getMeetingById(id: number): Observable<MeetingDTO> {
    return this.httpClient.get<MeetingDTO>(this.url + id);
  }

  public getFreeTimeSlots(findOccupiedDatesDTO: FindOccupiedDatesDTO): Observable<any> {
    return this.httpClient.post<any>(this.url + "freeTimeSlots", findOccupiedDatesDTO);
  }

  public addMeeting(meeting: AddMeetingDTO): Observable<any> {
    return this.httpClient.post<AddMeetingDTO>(this.url + 'add', meeting);
  }

  public setMeetingAsConfirmed(meetingId: number, proposedDateId): Observable<any> {
    return this.httpClient.put<MeetingDTO>(this.url + meetingId + "/setConfirmed/" + proposedDateId, null);
  }

  public addProposedDateToMeeting(meetingId: number, proposedDateDTO: AddProposedDateDTO): Observable<any> {
    return this.httpClient.put<MeetingDTO>(this.url + meetingId + "/addDate", proposedDateDTO);
  }

}
