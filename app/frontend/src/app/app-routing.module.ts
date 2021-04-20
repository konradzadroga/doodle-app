import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMeetingComponent } from './components/add-meeting/add-meeting.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MeetingsComponent } from './components/meetings/meetings.component';
import { MyMeetingsComponent } from './components/my-meetings/my-meetings.component';
import { OtherMeetingsComponent } from './components/other-meetings/other-meetings.component';
import { ProposeMeetingDateComponent } from './components/propose-meeting-date/propose-meeting-date.component';


const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "add-meeting", component: AddMeetingComponent},
  {path: "propose-meeting-date", component: ProposeMeetingDateComponent},
  {path: "home", component: HomeComponent},
  {path: "meetings", component: MeetingsComponent, children: [
    {path: "my-meetings", component: MyMeetingsComponent},
    {path: "other-meetings", component: OtherMeetingsComponent}
  ]},
  {path: "", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
