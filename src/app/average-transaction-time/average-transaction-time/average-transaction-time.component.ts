import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/data-provider';
import { AverageWaiting } from 'src/app/models/averagewaiting.model';
import { UtilityService } from 'src/app/services/utility.service';


@Component({
  selector: 'app-average-transaction-time',
  templateUrl: './average-transaction-time.component.html',
  styleUrls: ['./average-transaction-time.component.css']
})
export class AverageTransactionTimeComponent implements OnInit {

   avgTransData : AverageWaiting;
   dataAvailable : boolean;
   branchIds : string;

  constructor(private dataProvider : DataProvider , private utilityService : UtilityService) {

   }

  ngOnInit(): void {
   
    this.dataProvider.dashboardDataNew.subscribe(res => {

      if(res.avgTrtData.time != null){
        this.dataAvailable = true;
      }
      
      this.dataProvider.getBranchAccessData().subscribe((res : any) => {
        this.branchIds  = res.branchIds.toString();
      })

      this.avgTransData = res.avgTrtData;
    })
  }

  getAverageTime(timeInSec : number){
    return this.utilityService.getAverageTime(timeInSec);
  }

}
