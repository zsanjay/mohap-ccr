import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { DataProvider } from 'src/app/data-provider';
import { Counter } from 'src/app/models/counter.model';

@Component({
  selector: 'app-counter-status',
  templateUrl: './counter-status.component.html',
  styleUrls: ['./counter-status.component.css']
})
export class CounterStatusComponent implements OnInit {

  public canvas : any;
  public ctx : any;
  public counterData : Counter;
  doughnutChart : any;
  dataAvailable : boolean;

  constructor(private dataProvider : DataProvider) {
   }

   ngOnInit(): void {

    this.dataProvider.dashboardDataNew.subscribe(res => {

      this.counterData = res.counterData;

      if(this.counterData.closed != null){
        this.dataAvailable = true;
      this.loadChart(this.counterData.closed , this.counterData.open);
      }
      
    })

  }

  loadChart(closed : number , open : number){

    this.canvas = document.getElementById("counterStatus");
    this.ctx = this.canvas.getContext("2d");

    var data = {
     datasets: [{
         data: [closed , open],
         backgroundColor : ['#E33A23' , '#38AE3D'],
         weight : 2,
         hoverBackgroundColor: [
           "#E33A23",
           "#38AE3D"
       ],
       borderWidth: [
           0, 0
       ]
     }],
 };

   var doughnutChartConfiguration: any = {
     aspectRatio: 1.5,
     cutoutPercentage: 70,
       animation: {
           animationRotate: true,
           duration: 2000
       },
       legend: {
           display: false
       },
       tooltips: {
           enabled: false
       }
   };

   this.doughnutChart = new Chart(this.ctx, {
     type: 'doughnut',
     data: data,
     options: doughnutChartConfiguration
 });
  }

 
}
