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
import { QueueDataSource } from './queue-datasource';

@Component({
  selector: 'app-avg-waiting-time-queues',
  templateUrl: './avg-waiting-time-queues.component.html',
  styleUrls: ['./avg-waiting-time-queues.component.css']
})
export class AvgWaitingTimeQueuesComponent implements OnInit, AfterViewInit , OnDestroy {

  displayedColumns = ['name', 'avgWtTime' , 'waiting' , 'open' , 'servicePoints'];
  hospitalColors = ['blue' , 'purple' , 'green' , 'orange'];
  dataSource : QueueDataSource;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<AvgWaitingTimeBranch>;
  backImage = "assets/images/less-than.png";
  selectedSorting : string;
  branchId : number;
  branchSubs : Subscription;
  sortBranch : Subscription;
  branchIds : string;
  branchName : string;

  constructor(private dataProvider : DataProvider , private filterService : FilterService , private route : ActivatedRoute , 
    private utilityService : UtilityService , private pdfService : PDFService ,
     private translateService : TranslateService , private printService : PrintService) {

   }

  ngOnInit(): void {

    this.route.params.forEach(param => {
    this.selectedSorting = param['sort'];
    this.branchId = Number.parseInt(param['branchId']);
    this.branchName = param['branchName'];
    })    

    this.dataSource = new QueueDataSource(this.dataProvider , this.filterService);
    this.dataSource.loadData(this.selectedSorting , this.branchId);
  }

  ngAfterViewInit() {

    this.dataSource.sort = this.sort;

    this.branchSubs =  this.filterService.branch.subscribe(criteria => {
    
      this.branchId = criteria.branchId;
      this.branchName = criteria.branchName;
      this.dataSource.filterWithCriteria(criteria);

    })

    this.sortBranch = this.filterService.sortBranch.subscribe(criteria => {
    this.dataSource.filterWithCriteria(criteria);
    })

    this.filterService.queueBranchIds.subscribe(branchIds => {
      this.branchIds = branchIds.join(",");
    })
    
  }
  
  getFirstLetter(item : string){
    return this.utilityService.getFirstLetter(item);
  }

  getColor(index : number){
    return this.utilityService.getColor(index);
  }

  sortData(sort : Sort){
    this.dataSource.getSortedData(sort);
  }

  getTimeColor(timeInSec : number){
    return this.utilityService.getTimeColorForMins(timeInSec);
  }

  onPrint(){

    let coloums = [];
    coloums.push(this.translateService.instant('dashboard.name'));
    coloums.push(this.translateService.instant('dashboard.waiting_time'));
    coloums.push(this.translateService.instant('dashboard.waiting_customers'))
    coloums.push(this.translateService.instant('dashboard.open_counters'));

    this.pdfService.createPdf(coloums,this.displayedColumns , this.dataSource.pdfData , "Avg Waiting Time - Departments" , "avg_wt_time_dept.pdf");
  }

  onPrintPage(){
    this.printService.print("avg-wt-time-queue");
  }

  ngOnDestroy(): void {
    this.branchSubs.unsubscribe();
    this.sortBranch.unsubscribe();
  }

}
