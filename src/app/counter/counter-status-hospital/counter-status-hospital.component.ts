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
import { CounterStatusHospitalDataSource } from './counter-status-hospital-datasource';

@Component({
  selector: 'app-counter-status-hospital',
  templateUrl: './counter-status-hospital.component.html',
  styleUrls: ['./counter-status-hospital.component.css']
})
export class CounterStatusHospitalComponent implements OnInit {

  displayedColumns = ['name', 'total' , 'open' , 'closed'];
  dataSource: CounterStatusHospitalDataSource;
  @ViewChild(MatSort) sort!: MatSort;
  backImage = "assets/images/less-than.png";
  branchIdSubs: Subscription;
  branchId: number;
  branchIds : string;

  constructor(private dataProvider: DataProvider, private filterService: FilterService, private route: ActivatedRoute, 
    private utilityService: UtilityService , private translateService : TranslateService , private pdfService : PDFService,
    private printService : PrintService) {

  }

  ngOnInit(): void {

    this.dataSource = new CounterStatusHospitalDataSource(this.dataProvider);
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

  sortData(sort: Sort) {
    this.dataSource.getSortedData(sort);
  }

  onPrint(){
    let coloums = [];
    coloums.push(this.translateService.instant('dashboard.name'));
    coloums.push(this.translateService.instant('dashboard.total-counters'));
    coloums.push(this.translateService.instant('dashboard.open-counters'));
    coloums.push(this.translateService.instant('dashboard.closed-counters'));

    this.pdfService.createPdf(coloums,this.displayedColumns , this.dataSource.pdfData , "Counter Status" , "counter_status.pdf");
  }

  onPrintPage(){
    this.printService.print("cs-hospital");
  }

  ngOnDestroy(): void {
    this.branchIdSubs.unsubscribe();
  }

}
