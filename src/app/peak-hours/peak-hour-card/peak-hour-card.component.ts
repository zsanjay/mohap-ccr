import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-peak-hour-card',
  templateUrl: './peak-hour-card.component.html',
  styleUrls: ['./peak-hour-card.component.css']
})
export class PeakHourCardComponent implements OnInit {

  @Input() title: string = "";
  @Input() className : string;

  constructor() { }

  ngOnInit(): void {
    
  }

}
