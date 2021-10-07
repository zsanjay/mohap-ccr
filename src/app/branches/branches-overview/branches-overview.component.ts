import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DataProvider } from 'src/app/data-provider';
import { FilterService } from 'src/app/services/filter.service';
import { PDFService } from 'src/app/services/pdf.service';
import { UtilityService } from 'src/app/services/utility.service';
import { BranchOverviewDataSource } from './branches-overview-datasource';
import { PrintService } from 'src/app/services/print.service';

@Component({
  selector: 'app-branches-overview',
  templateUrl: './branches-overview.component.html',
  styleUrls: ['./branches-overview.component.css']
})
export class BranchesOverviewComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['name', 'avgTrtTime' , 'avgWtTime' , 'served' ,'waiting', 'open', 'closed'];
  dataSource: BranchOverviewDataSource;
  @ViewChild(MatSort) sort!: MatSort;
  backImage = "assets/images/less-than.png";
  branchIdSubs: Subscription;
  branchIds: string;
  

  constructor(private dataProvider: DataProvider, private filterService: FilterService, private route: ActivatedRoute,
     private utilityService: UtilityService , private translateService : TranslateService , private pdfService : PDFService , 
     private printService : PrintService) {

  }

  ngOnInit(): void {

    this.dataSource = new BranchOverviewDataSource(this.dataProvider, this.utilityService);
   // this.dataSource.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;

   this.branchIdSubs = this.filterService.branchIds.subscribe(ids => {

      this.branchIds = ids.toString();
      this.dataSource.filterByRegion(ids);

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

  getTimeColor(timeInSec : number){
    return this.utilityService.getTimeColor(timeInSec);
  }

  onExportPDF(){
    let coloums = [];
    coloums.push(this.translateService.instant('dashboard.name'));
    coloums.push(this.translateService.instant('dashboard.avg_trt_time'));
    coloums.push(this.translateService.instant('dashboard.avg_wt_time'));
    coloums.push(this.translateService.instant('dashboard.served'));
    coloums.push(this.translateService.instant('dashboard.waiting'));
    coloums.push(this.translateService.instant('dashboard.open'));
    coloums.push(this.translateService.instant('dashboard.closed'));

    this.pdfService.createPdf(coloums,this.displayedColumns , this.dataSource.pdfData , "Branches" , "branches.pdf");
  }

  onPrintPage(){
    this.printService.print('branchTable');
  }

  ngOnDestroy(): void {
    this.branchIdSubs.unsubscribe();
  }

}
