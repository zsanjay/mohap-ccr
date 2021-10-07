import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataProvider } from 'src/app/data-provider';
import { FilterService } from 'src/app/services/filter.service';
import { UtilityService } from 'src/app/services/utility.service';
import { CounterStatusDataSource } from './counter-status-datasource';

@Component({
  selector: 'app-served-and-waiting-dept-counter-status',
  templateUrl: './served-and-waiting-dept-counter-status.component.html',
  styleUrls: ['./served-and-waiting-dept-counter-status.component.css']
})
export class ServedAndWaitingDeptCounterStatusComponent implements OnInit {

  displayedColumns = ['name', 'status' , 'staffName' , 'served' ,'totalTrTime'];
  dataSource: CounterStatusDataSource;
  @ViewChild(MatSort) sort!: MatSort;
  backImage = "assets/images/less-than.png";
  branchIdSubs: Subscription;
  branchId: number;
  branchName : string;
  pageName : string;

  constructor(private dataProvider: DataProvider, private filterService: FilterService, private route: ActivatedRoute, private utilityService: UtilityService) {

  }

  ngOnInit(): void {

    this.route.params.forEach(param => {
      this.branchId = Number.parseInt(param['branchId']);
      this.pageName = param['page'];
      this.branchName = param['branchName'];
    }) 

    this.dataSource = new CounterStatusDataSource(this.dataProvider);
    this.dataSource.loadData(this.branchId);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;

   this.branchIdSubs = this.filterService.branch.subscribe(criteria => {

      this.branchId = criteria.branchId;
      this.branchName = criteria.branchName;
      this.dataSource.filterByBranch(this.branchId);

    })

  }

  getFirstLetter(item: string) {
    return this.utilityService.getFirstLetter(item);
  }

  getColor(index: number) {
    return this.utilityService.getColor(index);
  }

  getWaitingTime(timeInSec: number) {
    return this.utilityService.getAverageTime(timeInSec);

  }

  sortData(sort: Sort) {
    this.dataSource.getSortedData(sort);
  }

  ngOnDestroy(): void {
    this.branchIdSubs.unsubscribe();
  }

}
