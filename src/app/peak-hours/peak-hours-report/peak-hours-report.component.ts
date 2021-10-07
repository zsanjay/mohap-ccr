import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataProvider } from 'src/app/data-provider';
import { FilterService } from 'src/app/services/filter.service';
import { PrintService } from 'src/app/services/print.service';
import { UtilityService } from 'src/app/services/utility.service';
import { PeakHoursReportDataSource } from './peak-hours-report.datasource';

@Component({
  selector: 'app-peak-hours-report',
  templateUrl: './peak-hours-report.component.html',
  styleUrls: ['./peak-hours-report.component.css']
})
export class PeakHoursReportComponent implements OnInit , AfterViewInit {

  peakDate = "Peak Date";
  peakTime = "Peak Time";
  peakTimeServed = "Peak Time Served";
  peakcard = "peak-card";
  peakdate = "peak-date";
  peakDateValue : string;
  time : string;
  maxServed : number;
  servedRowData : number[][];
  maxServedByRow :number[] = [];
  backImage = "assets/images/less-than.png";

  dataSource : PeakHoursReportDataSource;
  
  displayedColumns: string[] = ["day", "one-am", "two-am", "three-am", "four-am", "five-am", "six-am", "seven-am", "eight-am", "nine-am", "ten-am", 
  "eleven-am" , "twelve-am" , "one-pm" , "two-pm" , "three-pm" ,"four-pm" , "five-pm" , "six-pm" , "seven-pm" , "eight-pm" ,"nine-pm" , "ten-pm" , "eleven-pm"];

  constructor(private dataProvider: DataProvider, private filterService: FilterService
    , private route: ActivatedRoute , private utilityService : UtilityService , private printService : PrintService) { }


  ngAfterViewInit(): void {

    this.filterService.filterHeapSubObs.subscribe(res => {
    this.dataSource.loadData(res.branchIds , res.startDate , res.endDate);
    })
  
  }

  ngOnInit(): void {

    this.dataSource = new PeakHoursReportDataSource(this.dataProvider , this);

    this.filterService.branchIds.subscribe(branchIds => {
    this.dataSource.loadData(branchIds , this.getFormattedDate() , this.getFormattedDate());
    })

  }

  getFirstLetter(item: string) {
    return this.utilityService.getFirstLetter(item);
  }

  getColor(index: number) {
    return this.utilityService.getColor(index);
  }

  setTimeAndServed(heapDate : any){
    let map = new Map();
    this.servedRowData = [];

    this.dataSource.peakHoursReportData.forEach((report , index) => {
     let data =  report.data;

      this.servedRowData[index] = [];

     data.forEach((d , i) => {

      this.servedRowData[index].push(d.served);

       if(map.has(d.hour_24.toString())){

       if(map.get(d.hour_24.toString()) < d.served)
          map.set(d.hour_24.toString() , d.served);
       }
       else{
          map.set(d.hour_24.toString() , d.served);
       }
     })

    this.maxServedByRow[index] = Math.max(...this.servedRowData[index]);
    })

    this.maxServed = heapDate.timeServed;
    this.peakDateValue = heapDate.date;

    if(heapDate.hour24 > 12){
      this.time = heapDate.hour24 % 12 + " PM";
    }
    else{
      this.time = heapDate.hour24 + " AM";
    }
  }

  getClassName(served : number , index : number){

  let max = this.maxServedByRow[index];

  if(served == 0 || max == 0)
  return {'grey' : true};
  
  let percentage = Number.parseFloat(((served/max)*100).toFixed(2));

    if(percentage == 0)
    return {'grey' : true};
    else if(percentage > 0 && percentage < 25)
    return {'light-yellow' : true};
    else if(percentage >= 25 && percentage < 50)
    return {'lighter-pink' : true};
    else if(percentage >= 50 && percentage < 75)
    return {'light-pink' : true};
    else if(percentage >= 75 && percentage < 100)
    return {'dark-pink' : true};
    else 
    return {'red': true};
}

getFormattedDate(){

  let date = new Date();
  var yyyy = date.getFullYear();
  let mm : any = date.getMonth() + 1; 
  let dd : any = date.getDate();

  if(mm < 10){
    mm = "0" + mm;
  }

  if(dd < 10){
    dd = "0" + dd;
  }

  return yyyy +""+ mm +""+ dd;

}


}

