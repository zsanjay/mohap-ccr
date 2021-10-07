import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/data-provider';
import { Happiness } from 'src/app/models/happiness.model';

@Component({
  selector: 'app-happiness-meter',
  templateUrl: './happiness-meter.component.html',
  styleUrls: ['./happiness-meter.component.css']
})
export class HappinessMeterComponent implements OnInit {

  public happinessData : Happiness;
  public happy = "assets/images/happy.png";
  public good = "assets/images/neutral.png";
  public notSatisfied = "assets/images/sad.png";

  constructor(private dataProvider : DataProvider) {     
   }

  ngOnInit(): void {

    this.dataProvider.dashboardDataNew.subscribe(res => {
      this.happinessData = res.happinessData;
    })
  }

}
