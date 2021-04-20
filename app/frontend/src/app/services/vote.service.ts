import { HttpHeaders, HttpClient } from "@angular/common/http";
import { GetVotesDTO, VoteDTO } from "../model/vote.model";
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class VoteService {

  constructor(private httpClient: HttpClient) { }

  url: string = 'http://value_goes_here:8080/votes/';

  public getVotesForProposedDate(id: number): Observable<GetVotesDTO> {
    return this.httpClient.get<GetVotesDTO>(this.url + id);
  }

  public addVote(id: number): Observable<VoteDTO> {
    return this.httpClient.post<VoteDTO>(this.url + 'add/' + id, null);
  }



}
