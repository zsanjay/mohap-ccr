import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DataProvider } from 'src/app/data-provider';
import { Emirates } from 'src/app/models/emirates.model';
import { Region } from 'src/app/models/region.model';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-emirates',
  templateUrl: './emirates.component.html',
  styleUrls: ['./emirates.component.css']
})
export class EmiratesComponent implements OnInit , OnDestroy {

  backImage = "assets/images/less-than.png";

  options: any;
  emirates: Emirates[] = [];
  name: string[] = [];
  served: number[] = [];
  waiting: number[] = [];
  noShow: number[] = [];
  regions: Region[];
  regionIds : number[];
  maxServed : number = 0;
  maxWaiting : number = 0;
  maxNoShow : number = 0;
  categories : any[] = [];
  accBranchIds : number[];
  regionSubs : Subscription;
  accountSubs : Subscription;


  constructor(private dataProvider: DataProvider) {

  }


  ngOnInit(): void {

  //  this.emirates = [{"id":5,"name":"Abdullah Bin Omran for Maternity and Womens Hospital","waiting":2,"served":140,"noShow":0},{"id":14,"name":"Al Amal for Mental Health Hospital","waiting":8,"served":98,"noShow":0},{"id":12,"name":"Al Kuwait Hospital- Dubai","waiting":5,"served":11,"noShow":0},{"id":19,"name":"Al Qarain Health Center","waiting":0,"served":0,"noShow":0},{"id":6,"name":"AlDhaid Hospital","waiting":3,"served":179,"noShow":8},{"id":2,"name":"AlQassimi Hospital","waiting":14,"served":341,"noShow":1},{"id":4,"name":"AlQassimi Womens and Childrens Hospital","waiting":32,"served":186,"noShow":12},{"id":18,"name":"Dibba Alfujairah Hospital","waiting":23,"served":391,"noShow":4},{"id":7,"name":"Fujairah Hospital","waiting":0,"served":91,"noShow":0},{"id":1,"name":"Ibrahim Bin Hamad Obaid Allah Hospital","waiting":7,"served":0,"noShow":0},{"id":9,"name":"Kalba Hospital","waiting":1,"served":252,"noShow":0},{"id":10,"name":"Khorfakkan Hospital","waiting":54,"served":243,"noShow":1},{"id":3,"name":"Kuwait Hospital","waiting":20,"served":137,"noShow":5},{"id":8,"name":"Masafi Hospital","waiting":0,"served":0,"noShow":0},{"id":13,"name":"Saqr Hospital","waiting":3,"served":132,"noShow":2},{"id":15,"name":"Shaam Hospital","waiting":9,"served":81,"noShow":0},{"id":16,"name":"Umm Al-Quwain Hospital","waiting":20,"served":143,"noShow":0}];  
  //  this.regions = [{"id":1,"name":"REGIONS","fullName":"REGIONS","description":null,"subgroupIds":[],"branchIds":[3,12,8,15,6,10,7,1,4,13,9,14,5,19,16,2,18]},{"id":51,"name":"DXB","fullName":"DXB","description":null,"subgroupIds":[],"branchIds":[12,14]},{"id":52,"name":"SHJ","fullName":"SHJ","description":null,"subgroupIds":[],"branchIds":[3,6,10,4,9,19,2]},{"id":53,"name":"AJM","fullName":"AJM","description":null,"subgroupIds":[],"branchIds":[]},{"id":54,"name":"RAK","fullName":"RAK","description":null,"subgroupIds":[],"branchIds":[15,1,13,5]},{"id":55,"name":"UMQ","fullName":"UMQ","description":null,"subgroupIds":[],"branchIds":[16]},{"id":56,"name":"FUJ","fullName":"FUJ","description":null,"subgroupIds":[],"branchIds":[8,7,18]}];

    let reg = this.dataProvider.getRegions();
    let emirate = this.dataProvider.getEmiratesData();
    //this.regionService.loadData("Accounts");

   let accountData = this.dataProvider.getBranchAccessData();
   this.accountSubs =   accountData.subscribe((account : any) => {
   this.accBranchIds =  account.branchIds;
   
    this.regionSubs =  combineLatest(reg, emirate)
      .subscribe((res: any) => {
        this.regions = res[0];
        this.emirates = res[1];

        this.regions.forEach(region => {

          if (region.name != "REGIONS") {
            let served = 0, waiting = 0, noShow = 0;

             let categoriesObj : any = {};
             categoriesObj.region = region;
             categoriesObj.accountIds = this.accBranchIds;

             this.categories.push(categoriesObj);
            this.emirates.forEach(data => {

              if (region.branchIds.includes(data.id)) {

                served += data.served;
                waiting += data.waiting;
                noShow += data.noShow;

              }
            })

            if (this.maxServed < served)
              this.maxServed = served;

            if (this.maxWaiting < waiting)
              this.maxWaiting = waiting;

            if (this.maxNoShow < noShow)
              this.maxNoShow = noShow;

            this.served.push(served);
            this.waiting.push(waiting);
            this.noShow.push(noShow);
          }
        })

        this.maxServed = this.maxServed + 100;
        this.maxWaiting = this.maxWaiting + 50;
        this.maxNoShow = this.maxNoShow + 50;


        this.options = {
          chart: {
            type: 'column',
            events: {
              load: function(event : any) {
  
                var axis = event.target.xAxis[0] 
                var ticks = axis.ticks
                var points = event.target.series[0].points
                var regions :any[] = [];
                
        
                points.forEach(function(point : any, i : number) {
                  
                  if (ticks[i]) {
                    var label = ticks[i].label.element;

                    regions.push(point.category);
                    
                    label.onclick = function(value : any) {

                      var region : any;
                      var accountIds : any;
                      regions.forEach(r => {
                        if(value.target.innerHTML == r['region'].name){
                        region = r['region'];
                        accountIds = r['accountIds'];
                        }
                      })
                    
                      var branchIds = " ";
                      if(region.branchIds.length > 0)
                      branchIds = region.branchIds;
                
                      let hasAccess = false;

                      if(accountIds.length == 0)
                      hasAccess = true;
                      else{
                      region.branchIds.forEach((id : number) => {
                  
                        if(accountIds.includes(id))
                        hasAccess = true;
                  
                      })
                    }

                     if(hasAccess){
                      var url = "#/emirates/"+branchIds+"(secondRouter:filter/false/"+region.id+")";
                      location.href = url;
                    }
                     else{
                     //  var url = "#";
                       //location.href = url;
                     }
                    }
                  }
                  
                })
              }
            }
          },
          title: {
            text: ''
          },
          xAxis: {
            categories: this.categories,//['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah'],
            lineWidth: 0,
            labels: {
              style: {
                color: "#8C8C8E",
                cursor: "pointer",
                fontSize: "16px"
              },
              formatter: function (data : any) : any {
                return data['value']['region'].name;
            }
            }
          },
          yAxis: [{
            visible: false,
           // min: 0,
         //  minRange: 100
            max: this.maxServed
          }, {
            id: 'second-y-axis',
            opposite: true,
            max: this.maxWaiting,
            visible : false
          },
          {
            id: 'third-y-axis',
            opposite: true,
            max: this.maxNoShow,
            visible : false
          }],
          plotOptions: {
            column: {
              borderRadius: 5,
              dataLabels: {
                enabled: true,
                style: {
                  font: "12px , 'Helvetica'",
                  color: '#807F7E'
                }
              }
            },
            series: {
              pointWidth: 20
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
            data: this.served,
            color: '#4A96E0'
          }, {
            enableMouseTracking: false,
            data: this.waiting,
            color: '#5B4CA4',
            yAxis: 'second-y-axis'
          }, {
            enableMouseTracking: false,
            data: this.noShow,
            color: '#E76242',
            yAxis: 'third-y-axis'
          }]
        }

        Highcharts.chart('emirates', this.options);

     });

  });

  }

  ngOnDestroy(): void {
    this.regionSubs.unsubscribe();
    this.accountSubs.unsubscribe();
  }

}




