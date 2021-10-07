import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DataProvider } from 'src/app/data-provider';
import { AvgWaitingTimeBranch } from 'src/app/models/avgWaitingTimeBranch.model';
import { FilterService } from 'src/app/services/filter.service';
import { PDFService } from 'src/app/services/pdf.service';
import { PrintService } from 'src/app/services/print.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AvgTransactionTimeDataSource } from './average-transaction-time-branch.datasource';

@Component({
  selector: 'app-average-transaction-time-branch',
  templateUrl: './average-transaction-time-branch.component.html',
  styleUrls: ['./average-transaction-time-branch.component.css']
})
export class AverageTransactionTimeBranchComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['name', 'avgTrtTime', 'open', 'closed'];
  dataSource: AvgTransactionTimeDataSource;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<AvgWaitingTimeBranch>;
  backImage = "assets/images/less-than.png";
  selectedSorting: string;
  regionSubs: Subscription;
  sortSubs: Subscription;
  branchIds: string;

  constructor(private dataProvider: DataProvider, private filterService: FilterService, private route: ActivatedRoute,
     private utilityService: UtilityService , private pdfService : PDFService , private translateService : TranslateService , 
     private printService : PrintService) {

  }

  ngOnInit(): void {

    this.route.params.forEach(param => {
      this.selectedSorting = param['sort'];
    })

    this.dataSource = new AvgTransactionTimeDataSource(this.dataProvider, this.filterService , this.utilityService);
  //  this.dataSource.loadData(this.selectedSorting);
    this.filterService.changeHLFilter(this.selectedSorting);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;

    this.regionSubs = this.filterService.region.subscribe(criteria => {

      if (criteria.firstSort == false){
        this.dataSource.filterWithCriteria(criteria);
        this.selectedSorting = criteria.sort;
      }

    })

    this.sortSubs = this.filterService.sortWaitingTime.subscribe(criteria => {

      if (criteria.firstSort == false){
        this.dataSource.filterWithCriteria(criteria);
        this.selectedSorting = criteria.sort;
      }

    })

    this.filterService.branchIds.subscribe(ids => {
      this.branchIds = ids.join(",");
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

  getTimeColor(timeInSec : number){
    return this.utilityService.getTimeColor(timeInSec);
  }

  sortData(sort: Sort) {
    this.dataSource.getSortedData(sort);
  }

  onPrint(){

    let coloums = [];
    coloums.push(this.translateService.instant('dashboard.name'));
    coloums.push(this.translateService.instant('dashboard.trans_time'));
    coloums.push(this.translateService.instant('dashboard.open_counters'));
    coloums.push(this.translateService.instant('dashboard.closed_counters'));

    this.pdfService.createPdf(coloums,this.displayedColumns , this.dataSource.pdfData , "Avg Transaction Time" , "avg_trans_time.pdf");
  }

  onPrintPage(){
    this.printService.print("attb-table");
  }

  ngOnDestroy(): void {
    this.regionSubs.unsubscribe();
    this.sortSubs.unsubscribe();
  }

}
