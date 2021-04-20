import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ErrorStateMatcher } from '@angular/material/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { WaitingDialogComponent } from '../../waiting-dialog/waiting-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar, private dialog: MatDialog, private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  public errorMsg: any;
  username: string = '';
  password: string = '';
  name: string = '';
  surname: string = '';
  email: string = '';
  roles = ['ROLE_USER'];

  matcher = new ErrorStateMatcher();

  usernameFormControl = new FormControl('', [
    Validators.required
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  nameFormControl = new FormControl('', [
    Validators.required
  ]);

  surnameFormControl = new FormControl('', [
    Validators.required
  ]);

  emailFormControl = new FormControl('', [
    Validators.required
  ])

  showSnackbar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    })
  }

  register(): void {
    let dialogRef: MatDialogRef<WaitingDialogComponent> = this.dialog.open(WaitingDialogComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    this.authService.register(this.username, this.password, this.name, this.surname, this.email, this.roles).subscribe(
      data => {
        this.router.navigate(['login']);
        dialogRef.close();
        this.showSnackbar("Rejestracja przebiegła pomyślnie.", "OK");
      },
      error => {
        this.errorMsg = error;
        dialogRef.close();
      }
    );
  }

}
