import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../model/user.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  url: string = 'http://value_goes_here:8080/users/'

  constructor(private httpClient: HttpClient) { }

  public getAllUsernames(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.url + 'usernames')
  }

  public getUserByUsername(username: string): Observable<UserDTO> {
    return this.httpClient.get<UserDTO>(this.url + username);
  }
}
