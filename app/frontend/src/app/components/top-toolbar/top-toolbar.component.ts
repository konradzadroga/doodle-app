import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorage } from 'src/app/auth/token.storage';

@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss']
})
export class TopToolbarComponent implements OnInit {

  loggedIn: boolean = false;
  username: string = '';

  constructor(private tokenStorage: TokenStorage, private _router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.isUserSignedIn() === true) {
      this.loggedIn = true;
      this.username = this.tokenStorage.getUsername();
    }
  }

  signOut() {
    this.tokenStorage.signOut();
    this._router.navigate(['home']).then(() => this.tokenStorage.reloadPage());
  }

}
