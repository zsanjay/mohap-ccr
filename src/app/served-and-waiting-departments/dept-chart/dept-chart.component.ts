import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);

@Component({
  selector: 'app-dept-chart',
  templateUrl: './dept-chart.component.html',
  styleUrls: ['./dept-chart.component.css']
})
export class DeptChartComponent implements OnInit , AfterViewInit , OnDestroy {


 // Highcharts: typeof HighchartsBoost = HighchartsBoost;
  
  @Input() data: Status;
  @Input() divId: string;
  served: number[] = [];
  others: number[] = [];
  noShow: number[] = [];
  options: any;
  public canvas : any;
  public ctx : any;
 deptmentDataChart : any;
  initialized = false;



  constructor() { }
 

  ngOnDestroy(): void {
   // this.deptmentDataChart.destroy();
  }

  ngOnInit(): void {

    if(this.data != null){
      
    this.others.push(this.data.others);
    this.served.push(this.data.served);
    this.noShow.push(this.data.noShows);
    
    } 
}

  ngAfterViewInit(): void {

   // this.setUpChart();
   setTimeout(()=>{                       
    this.setUpHighChart();
  }, 1);
  
  }

  setUpChart(){

this.canvas = document.getElementById(this.divId);
this.ctx = this.canvas.getContext("2d");

  if(this.canvas != null)
  this.initialized = true;

 this.deptmentDataChart =  new Chart(this.ctx, {   
   type: 'bar',
   data: {
    // labels: ['Served', 'Waiting' , 'NoShow'],
     datasets: [
       {
         //label: 'Dataset 1',
         data: this.served,
         backgroundColor : '#4A96E0'
        
       },
       {
         //label: 'Dataset 2',
         data: this.noShow,
         backgroundColor: '#5B4CA4'
       },
       {
        // label: 'Dataset 3',
         data: this.others,
         backgroundColor: '#E76242'
       }
     ]
   },
   options: {
     legend: {
       display: false
     },
     tooltips :{
       enabled : false
     },
     scales: {
       xAxes: [{
         display: false,
           gridLines: {
               display:false
           }
       }],
       yAxes: [ 
        {
         display: false,
           gridLines: {
               display:false
           },
           ticks: {
             max: 10,
             display: false,
             beginAtZero: true
           }   
       }]
   },
     responsive: true,
     plugins: {
       legend: {
         display : false
       }
     }
   },
 });

 
Chart.pluginService.register({
  afterDraw: function(chartInstance : any) {
      var ctx = chartInstance.chart.ctx;

      // render the value of the chart above the bar
      ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';

      chartInstance.data.datasets.forEach(function (dataset : any) {
          for (var i = 0; i < dataset.data.length; i++) {
              var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
              ctx.fillText(dataset.data[i], model.x, model.y - 2);
          }
      });
}


});

this.deptmentDataChart.data.datasets[0].data = this.served;
this.deptmentDataChart.data.datasets[1].data = this.noShow;
this.deptmentDataChart.data.datasets[2].data = this.others;

this.deptmentDataChart.update();
  }

  setUpHighChart(){
    this.options = {
      chart: {
        type: 'column',
        height : 80,
        width : 80
      },
      title: {
        text: ''
      },
      xAxis: {
        visible : false,
        categories: ['Dubai'],
        lineWidth: 0
      },
      yAxis: [
        {
        visible: false,
        min: 0,
      // minRange: 100
        max: this.served[0] + 5
      }, {
        id: 'second-y-axis',
        opposite: true,
        min : 0,
        max: this.noShow[0] + 5,
        visible : false
      },
      {
        id: 'third-y-axis',
        opposite: true,
        min : 0,
        max: this.others[0] + 5,
        visible : false
      }

    ],
      plotOptions: {
        column: {
          borderRadius: 5,
          dataLabels: {
            enabled: true,
            style: {
              font: "5px , 'Helvetica'",
              color: '#807F7E'
            }
          }
        },
        series: {
          pointWidth: 15,
        
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      tooltip: {
        enabled: false
      },
      series: [{
        enableMouseTracking: false,
       // type : 'line',
        data: this.served,
        color: '#4A96E0',
        
      }, {
        enableMouseTracking: false,
       // type : 'line',
        data: this.noShow,
        color: '#5B4CA4',
        yAxis: 'second-y-axis'
      }, {
        enableMouseTracking: false,
       // type : 'line',
        data: this.others,
        color: '#E76242',
        yAxis: 'third-y-axis'
      }]
    }
  
    Highcharts.chart(this.divId , this.options);
  }

}

interface Status{

  served: number,
  noShows : number,
  others : number

}