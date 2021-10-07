import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { DataProvider } from 'src/app/data-provider';
import { PeakHours } from 'src/app/models/peakHours.model';


@Component({
  selector: 'app-peak-hours',
  templateUrl: './peak-hours.component.html',
  styleUrls: [
    "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css",
    './peak-hours.component.css'
  ]
})
export class PeakHoursComponent implements OnInit , AfterViewInit , OnDestroy {

  public canvas : any;
  public ctx : any;
  public data : PeakHours[]; 
  peekHoursChart : any;
  
    count :any = [];
    hours :any = [];
    colors : string[] = [
      'lightgrey',
      'lightgrey',
      'lightgrey',
      'lightgrey',
      'lightgrey',
      'lightgrey',
      'lightgrey',
      'lightgrey',
      'lightgrey',
      'lightgrey',
      'lightgrey',
      'lightgrey'
  ];

  maxCount = 0;
  maxCountIndex : number;

  constructor(private dataProvider : DataProvider) {
   }

  ngOnDestroy(): void {
    this.peekHoursChart.destroy();
  }

  ngAfterViewInit(): void {

//     Chart.plugins.register({
//     afterUpdate :function(chart : any) {
//       if(chart.id == 0){
//       var ctx = chart.ctx;
//       chart.data.datasets.forEach(function(dataset : any, datasetIndex : any) {
//          var datasetMeta = chart.getDatasetMeta(datasetIndex);
//          datasetMeta.data.forEach(function(meta : any) {
//             var posX = meta._model.x;
//             var posY = meta._model.y;
//             var value = chart.data.datasets[meta._datasetIndex].data[meta._index];
//             // draw values
//             ctx.save();
//             ctx.textBaseline = 'bottom';
//             ctx.textAlign = 'center';
//             ctx.font = '12px Arial, sans-serif';
//             ctx.fillStyle = '#999';
//             ctx.fillText(value, posX, posY);
//             ctx.restore();
//          });
//       });
//    }
//  }
// });
    
    this.canvas = document.getElementById("peakHours");
    this.ctx = this.canvas.getContext("2d");

    var data = {
      labels: this.hours,
       datasets: [{
           data: this.count,
           barThickness: 20,
           backgroundColor: this.colors,
           fill: true  
       }]
   };

    this.peekHoursChart = new Chart(this.ctx, {
      type: 'bar',
      data: data,
      options: {
        legend: {
          display: false
        },
          scales: {
              yAxes: [{
                display: false
              },
            ],
              xAxes: [{
                display: true,
                gridLines: {
                  display: false,
              },
              ticks:{
                fontColor: '#999'
              },
                offset : true
              }],
          }
      }
  });

  if(this.maxCountIndex != undefined && this.maxCountIndex != 0){

  this.colors.splice(this.maxCountIndex,1,"#54b9ff");
  this.peekHoursChart.data.labels = this.hours;
  this.peekHoursChart.data.datasets[0].data = this.count;
  this.peekHoursChart.data.datasets[0].backgroundColor = this.colors;
  this.peekHoursChart.update();
  
  }

  }

  ngOnInit(): void {

    Chart.plugins.register({
      afterDatasetsDraw: function(chart : any) {
         if(chart.canvas.id == "peakHours"){
         var ctx = chart.ctx;
         chart.data.datasets.forEach(function(dataset : any, datasetIndex : any) {
            var datasetMeta = chart.getDatasetMeta(datasetIndex);
            datasetMeta.data.forEach(function(meta : any) {
               var posX = meta._model.x;
               var posY = meta._model.y;
               var value = chart.data.datasets[meta._datasetIndex].data[meta._index];
               // draw values
               ctx.save();
               ctx.textBaseline = 'bottom';
               ctx.textAlign = 'center';
               ctx.font = '12px Arial, sans-serif';
               ctx.fillStyle = '#999';
               ctx.fillText(value, posX, posY);
               ctx.restore();
            });
         });
      }
    }
   });

    this.dataProvider.dashboardDataNew.subscribe(res => {

      this.clearChartData();

      this.data = res.peakHours;

      if(this.data.length > 1){
        
        this.data.forEach( (x , index) => {

          if(this.maxCount < x.count){
            this.maxCount = x.count;
            this.maxCountIndex = index;
          }
          
         this.hours.push(x.hours_24);
         this.count.push(x.count);
         })
   
       }
       

       if(this.peekHoursChart != null){

      this.colors.splice(this.maxCountIndex,1,"#54b9ff");  

       this.peekHoursChart.data.labels = this.hours;
       this.peekHoursChart.data.datasets[0].data = this.count;
       this.peekHoursChart.data.datasets[0].backgroundColor = this.colors;
       this.peekHoursChart.update();
       }
    })

  }

  clearChartData(){

    this.data = [];
    this.maxCount = 0;
    this.maxCountIndex = 0;
    this.hours = [];
    this.count = [];
    
  }

}
