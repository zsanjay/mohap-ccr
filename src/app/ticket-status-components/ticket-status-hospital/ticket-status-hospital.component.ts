import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { DataProvider } from 'src/app/data-provider';
import { FilterService } from 'src/app/services/filter.service';
import { UtilityService } from 'src/app/services/utility.service';
import { TicketStatusHospitalDataSource } from './ticket-status-hospital-datasource';

@Component({
  selector: 'app-ticket-status-hospital',
  templateUrl: './ticket-status-hospital.component.html',
  styleUrls: ['./ticket-status-hospital.component.css']
})
export class TicketStatusHospitalComponent implements OnInit , OnDestroy {

    displayedColumns = ['name', 'served' , 'waiting' , 'no-shows'];
    dataSource: TicketStatusHospitalDataSource;
    @ViewChild(MatSort) sort!: MatSort;
    backImage = "assets/images/less-than.png";
    branchIdSubs: Subscription;
    branchIds : string;
  
    constructor(private dataProvider: DataProvider, private filterService: FilterService, private utilityService: UtilityService) {
  
    }
  
    ngOnInit(): void {
  
      this.dataSource = new TicketStatusHospitalDataSource(this.dataProvider);
      this.branchIdSubs = this.filterService.branchIds.subscribe(branchIds => {
        this.branchIds = branchIds.toString();
        this.dataSource.loadData(branchIds);
      })
      
    }
  
    ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
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

    getTimeColor(timeInSec : number){
      return this.utilityService.getTimeColor(timeInSec);
    }
  
    sortData(sort: Sort) {
      this.dataSource.getSortedData(sort);
    }
  
    ngOnDestroy(): void {
     this.branchIdSubs.unsubscribe();
    }
  

}
