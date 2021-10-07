import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataProvider } from 'src/app/data-provider';
import { AverageWaiting } from 'src/app/models/averagewaiting.model';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-average-waiting-time',
  templateUrl: './average-waiting-time.component.html',
  styleUrls: ['./average-waiting-time.component.css']
})
export class AverageWaitingTimeComponent implements OnInit {

  title = "Avg Waiting Time";
  public avgWaitingData : AverageWaiting;
  dataAvailable : boolean;
  branchIds : string;
  
  constructor(private dataProvider : DataProvider , private router : Router , private utilityService : UtilityService) { 
 
  }

  ngOnInit(): void {

    this.dataProvider.dashboardDataNew.subscribe(res => {

      if(res.avgTrtData.time != null){
        this.dataAvailable = true;
      }

      this.dataProvider.getBranchAccessData().subscribe((res : any) => {
        this.branchIds  = res.branchIds.toString();
      })

      this.avgWaitingData = res.avgWatData;
    })

  }

  getAverageTime(timeInSec : number){
    return this.utilityService.getAverageTime(timeInSec);
  }
  
   }

 
