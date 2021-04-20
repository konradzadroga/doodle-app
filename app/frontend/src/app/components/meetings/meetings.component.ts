import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent implements OnInit {

  chosen: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  choose(): void {
    this.chosen = true;
  }

}
