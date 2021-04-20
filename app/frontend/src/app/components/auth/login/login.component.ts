import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/auth/auth.service';
import { TokenStorage } from 'src/app/auth/token.storage';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WaitingDialogComponent } from '../../waiting-dialog/waiting-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router, private authService: AuthService, private token: TokenStorage, private _snackBar: MatSnackBar) {
  }

  username: string = '';
  password: string = '';
  loginFailed: boolean = false;
  loggedIn: boolean = false;
  errorMsg: string = '';

  matcher = new ErrorStateMatcher();

  usernameFormControl = new FormControl('', [
    Validators.required,
  ])

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  ngOnInit() {
    if (this.token.isUserSignedIn()) {
      this.router.navigate(['home']);
    }
  }

  showSnackbar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    })
  }

  login(): void {
    let dialogRef: MatDialogRef<WaitingDialogComponent> = this.dialog.open(WaitingDialogComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    this.authService.login(this.username, this.password).subscribe(
      data => {
        this.loginFailed = false;
        this.loggedIn = true;
        this.token.saveToken(data.token);
        this.token.saveUsername(data.username);
        this.token.saveAuthorities(data.authorities);
        dialogRef.close();
        this.showSnackbar("Zalogowano pomyślnie.", "OK")
        this.token.reloadPage();
      },
      error => {
        console.log(error);
        this.errorMsg = error;
        this.loginFailed = true;
        dialogRef.close();
      }
    );
  }
}