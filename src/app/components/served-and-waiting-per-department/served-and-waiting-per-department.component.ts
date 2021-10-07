import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/data-provider';
import { ServedWaiting } from 'src/app/models/servedwaiting.model';

@Component({
  selector: 'app-served-and-waiting-per-department',
  templateUrl: './served-and-waiting-per-department.component.html',
  styleUrls: ['./served-and-waiting-per-department.component.css']
})
export class ServedAndWaitingPerDepartmentComponent implements OnInit {

  public servedAndWaitingData : ServedWaiting[];

  constructor(private dataProvider : DataProvider) { 
  }

  ngOnInit(): void {
    this.dataProvider.dashboardDataNew.subscribe(res => {
      this.servedAndWaitingData = res.servedWaiting;
    })

  }

}

