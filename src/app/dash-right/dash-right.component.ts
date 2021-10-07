import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ModeService } from '../services/mode.service';

@Component({
  selector: 'app-dash-right',
  templateUrl: './dash-right.component.html',
  styleUrls: ['./dash-right.component.css']
})
export class DashRightComponent implements OnInit {
  

  cards = ["Counter Status" , "Customer Status" , "Happiness Meter"];
  smileyLogo = "assets/images/Emoji.png";
  isDarkTheme : boolean = false;

  constructor(private modeService : ModeService){

  }

  ngOnInit(): void {
    this.modeService.mode.subscribe(result => {
      this.isDarkTheme = result;
    });
  }

}
