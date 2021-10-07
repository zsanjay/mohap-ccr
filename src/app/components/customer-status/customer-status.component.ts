import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { DataProvider } from 'src/app/data-provider';
import { Customer } from 'src/app/models/customer.model';

@Component({
  selector: 'app-customer-status',
  templateUrl: './customer-status.component.html',
  styleUrls: ['./customer-status.component.css']
})
export class CustomerStatusComponent implements OnInit {

  public canvas : any;
  public ctx : any;
  public customerData : Customer
  doughnutChart : any;
  dataAvailable : boolean;

  constructor(private dataProvider : DataProvider) {
   }

  ngOnInit(): void {

    this.dataProvider.dashboardDataNew.subscribe(res => {
      this.customerData = res.customerData;

      if(this.customerData.noShows != null){
        this.dataAvailable = true;
      this.loadChart(this.customerData.noShows, this.customerData.waiting, this.customerData.served);
      }
    })
   
  }

  loadChart(noShows : number , waiting : number , served : number){

    this.canvas = document.getElementById("customerStatus");
    this.ctx = this.canvas.getContext("2d");

    var data = {
      datasets: [{
          data: [ noShows , waiting , served ],
          backgroundColor : ['#C8C8C8' , '#4A96E0' , '#5B4DA6'],
          borderWidth : 1,
          weight : 1
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
