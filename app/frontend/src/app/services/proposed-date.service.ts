import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ProposedDateDTO } from "../model/date.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProposedDateService {

  url = 'http://value_goes_here:8080/dates/'

  constructor(private httpClient: HttpClient) { }

  public voteForTheDate(id: number): Observable<ProposedDateDTO> {
    return this.httpClient.put<ProposedDateDTO>(this.url + id + "/vote", null);
  }


}
