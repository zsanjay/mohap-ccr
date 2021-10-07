import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DataProvider } from 'src/app/data-provider';
import { FilterService } from 'src/app/services/filter.service';
import { PDFService } from 'src/app/services/pdf.service';
import { PrintService } from 'src/app/services/print.service';
import { UtilityService } from 'src/app/services/utility.service';
import { CounterStatusLiveDataSource } from './counter-status-live-datasource';

@Component({
  selector: 'app-counter-status-live',
  templateUrl: './counter-status-live.component.html',
  styleUrls: ['./counter-status-live.component.css']
})
export class CounterStatusLiveComponent implements OnInit {

  displayedColumns = ['name', 'staffFullName' , 'workprofileName' , 'ticketNumber' , 'serviceName' , 'transactionTime'];
  dataSource: CounterStatusLiveDataSource;
  @ViewChild(MatSort) sort!: MatSort;
  backImage = "assets/images/less-than.png";
  branchId: number;
  branchIds : string;
  branchIdSub : Subscription;
  branchIdsSub : Subscription;
  branchName : string;

  constructor(private dataProvider: DataProvider, private filterService: FilterService, private route: ActivatedRoute,
     private utilityService: UtilityService , private printService : PrintService , private translateService : TranslateService
     , private pdfService : PDFService) {

  }

  ngOnInit(): void {

    this.route.params.forEach(param => {
      this.branchId = Number.parseInt(param['branchId']);
      this.branchName = param['branchName'];
    })

    this.dataSource = new CounterStatusLiveDataSource(this.dataProvider , this.utilityService);
    this.dataSource.loadData(this.branchId);
    
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;

    this.branchIdsSub = this.filterService.branchIds.subscribe(ids => {
      this.branchIds = ids.toString();
    })

  this.branchIdSub = this.filterService.branchId.subscribe(branchId => {
      this.branchId = branchId;
      this.dataSource.loadData(branchId);
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

  onPrint(){
    let coloums = [];
    coloums.push(this.translateService.instant('dashboard.counter'));
    coloums.push(this.translateService.instant('dashboard.staff'));
    coloums.push(this.translateService.instant('dashboard.work-profile'));
    coloums.push(this.translateService.instant('dashboard.ticket_no'));
    coloums.push(this.translateService.instant('dashboard.service'));
    coloums.push(this.translateService.instant('dashboard.trt-time'));

    this.pdfService.createPdf(coloums,this.displayedColumns , this.dataSource.pdfData , "Counter Status" , "counter_status.pdf");
  }

  onPrintPage(){
    this.printService.print("cs-live");
  }

  ngOnDestroy(): void {
    this.branchIdSub.unsubscribe();
  }

}
