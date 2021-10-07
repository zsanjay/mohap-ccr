import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DataProvider } from 'src/app/data-provider';
import { FilterService } from 'src/app/services/filter.service';
import { PDFService } from 'src/app/services/pdf.service';
import { PrintService } from 'src/app/services/print.service';
import { UtilityService } from 'src/app/services/utility.service';
 import { QueueOverviewDataSource } from './queues-overview-datasource';

@Component({
  selector: 'app-queues-overview',
  templateUrl: './queues-overview.component.html',
  styleUrls: ['./queues-overview.component.css']
})
export class QueuesOverviewComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['name', 'avgTrtTime' , 'avgWtTime' , 'served' ,'waiting', 'open'];
  dataSource: QueueOverviewDataSource;
  @ViewChild(MatSort) sort!: MatSort;
  backImage = "assets/images/less-than.png";
  branchIdSubs: Subscription;
  branchId: number;
  branchName : string;

  constructor(private dataProvider: DataProvider, private filterService: FilterService, private route: ActivatedRoute,
     private utilityService: UtilityService , private translateService : TranslateService ,
      private pdfService : PDFService , private printService : PrintService) {

  }

  ngOnInit(): void {

    this.route.params.forEach(param => {
      this.branchId = Number.parseInt(param['branchId']);
      this.branchName = param['branchName'];
    }) 

    this.dataSource = new QueueOverviewDataSource(this.dataProvider, this.utilityService);
    this.dataSource.loadData(this.branchId);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;

   this.branchIdSubs = this.filterService.branchId.subscribe(id => {

      this.branchId = id;
      this.dataSource.pdfData.forEach(data => {
        if(data.id == id){
          this.branchName = data.name;
        }
      })
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

  onPrint(){
    let coloums = [];
    coloums.push(this.translateService.instant('dashboard.name'));
    coloums.push(this.translateService.instant('dashboard.avg_trt_time'));
    coloums.push(this.translateService.instant('dashboard.avg_wt_time'));
    coloums.push(this.translateService.instant('dashboard.served'));
    coloums.push(this.translateService.instant('dashboard.waiting'));
    coloums.push(this.translateService.instant('dashboard.open'));

    this.pdfService.createPdf(coloums,this.displayedColumns , this.dataSource.pdfData , "Queues" , "queues.pdf");
  }

  onPrintPage(){
    this.printService.print("queue-table");
  }

  ngOnDestroy(): void {
    this.branchIdSubs.unsubscribe();
  }

}

