import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Interceptor } from './auth/interceptor';
import { AuthService } from './auth/auth.service';
import { TokenStorage } from './auth/token.storage';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TopToolbarComponent } from './components/top-toolbar/top-toolbar.component';
import { HomeComponent } from './components/home/home.component';
import { AddMeetingComponent } from './components/add-meeting/add-meeting.component';
import { UserService } from './services/user.service';
import { MeetingService } from './services/meeting.service';
import { MeetingComponent } from './components/meeting/meeting.component';
import { MyMeetingsComponent } from './components/my-meetings/my-meetings.component';
import { OtherMeetingsComponent } from './components/other-meetings/other-meetings.component';
import { MeetingsComponent } from './components/meetings/meetings.component';
import { VoteService } from './services/vote.service';
import { ProposeMeetingDateComponent } from './components/propose-meeting-date/propose-meeting-date.component';
import { WaitingDialogComponent } from './components/waiting-dialog/waiting-dialog.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TopToolbarComponent,
    HomeComponent,
    AddMeetingComponent,
    MeetingComponent,
    MyMeetingsComponent,
    OtherMeetingsComponent,
    MeetingsComponent,
    ProposeMeetingDateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatStepperModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  providers: [MatNativeDateModule, UserService, MeetingService, VoteService,
    {provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi : true}, AuthService, TokenStorage],
  bootstrap: [AppComponent],
  entryComponents: [
    WaitingDialogComponent
  ]
})
export class AppModule { }
