import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataProvider } from 'src/app/data-provider';
import { ServedWaitingDepartment } from 'src/app/models/servedandwaitingdept.model';
import { EmiratesService } from 'src/app/services/emirates.service';
import { FilterService } from 'src/app/services/filter.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ServedAndWaitingDeptDataSource } from '../served-and-waiting-departments/served-and-waiting-dept-datasource';

@Component({
  selector: 'app-served-and-waiting-departments',
  templateUrl: './served-and-waiting-departments.component.html',
  styleUrls: ['./served-and-waiting-departments.component.css']
})
export class ServedAndWaitingDepartmentsComponent implements OnInit , OnDestroy {

  dataSource: ServedAndWaitingDeptDataSource;
  data: ServedWaitingDepartment[];
  @ViewChild(MatSort) sort!: MatSort;
  pageEvent: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('tableContent', { read: ElementRef }) tableContent: ElementRef<any>;
  backImage = "assets/images/less-than.png";
  selectedSorting: string;
  branchId: string;
  selectedBranchId : string;
  branchSubs: Subscription;
  branchIdSubs : Subscription;
  dataSubs: Subscription;
  branchDataSubs : Subscription;
  deptSub : Subscription;
  deptDataSubs : Subscription;
  branchIds: number[];
  isAvailable : boolean;
  isEmpty : boolean;
  pageSize = 10;
  length: number;
  leftArrow = "assets/images/left-arrow.png";
  rightArrow = "assets/images/right-arrow.png";
  heading = "Departments";


  displayedColumns: string[] = ["name", "left-arrow", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", 
  "eleven" , "twelve" , "thirteen" , "fourteen" , "fifteen" ,"sixteen" , "seventeen" , "eighteen" , "nineteen" , "twenty" ,"twenty-one" ,
   "twenty-two" , "twenty-three" , "right-arrow"];

  constructor(private dataProvider: DataProvider, private filterService: FilterService
    , private route: ActivatedRoute, private utilityService: UtilityService, private emiratesService: EmiratesService) {

  }

  ngOnInit(): void {

    this.dataSource = new ServedAndWaitingDeptDataSource(this.dataProvider, this.emiratesService);
    
    this.route.params.forEach(param => {

      if(param['page'])
      this.heading = param['page'];
      }) 

    if(this.heading === "Departments"){

   this.branchSubs = this.filterService.branchIds.subscribe(branchIds => {
    this.branchIds = branchIds;
    this.isAvailable = true;
    this.selectedBranchId = branchIds[0].toString();
    this.branchId = branchIds[0].toString();
    this.paginator.firstPage();
    this.dataSource.loadDataAllBranchesData(branchIds , 0 , this.pageSize);
    });

  }

  this.dataSubs = this.dataSource.data.subscribe(res => {
      this.length = res.totalCount;
      this.data = res.data;
  
      if(this.length == 0)
      this.isEmpty = true;
      else
      this.isEmpty = false;

    })
    

   this.branchIdSubs = this.filterService.branchId.subscribe(branchId => {
      this.isAvailable = false;
      this.branchId = branchId.toString();
      this.selectedBranchId = branchId.toString();

      if(this.heading !== "Departments"){
      this.dataSource.loadData(branchId.toString(), 0, this.pageSize);
    this.branchDataSubs = this.dataSource.data.subscribe(res => {
        this.data = res.data;
        this.length = res.totalCount;
        
      if(this.length == 0)
      this.isEmpty = true;
      else
      this.isEmpty = false;

      })
    }

    })

  }

  ngAfterViewInit() {

   // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

  this.deptSub = this.filterService.filterDeptmentSubObs.subscribe(branchId => {
      this.isAvailable = false;
      this.branchId = branchId.toString();
      this.selectedBranchId = branchId.toString();
      this.paginator.firstPage();
      this.dataSource.loadData(branchId.toString(), 0, this.pageSize);
    this.deptDataSubs = this.dataSource.data.subscribe(res => {
        this.data = res.data;
        this.length = res.totalCount;
        
      if(this.length == 0)
      this.isEmpty = true;
      else
      this.isEmpty = false;

      })
    })

  }

  getFirstLetter(item: string) {
    return this.utilityService.getFirstLetter(item);
  }

  getColor(index: number) {
    return this.utilityService.getColor(index);
  }

  sortData(sort: Sort) {
    // this.dataSource.getSortedData(sort);
  }

  ngOnDestroy(): void {
    if(this.branchSubs != null)
     this.branchSubs.unsubscribe();

     if(this.dataSubs != null)
    this.dataSubs.unsubscribe();

    if(this.branchIdSubs != null)
    this.branchIdSubs.unsubscribe();

    if(this.deptSub != null)
    this.deptSub.unsubscribe();

    if(this.branchDataSubs != null)
    this.branchDataSubs.unsubscribe();

    if(this.deptDataSubs != null)
    this.deptDataSubs.unsubscribe();
  }

  scrollLeft() {
    this.tableContent.nativeElement.scrollTo({ left: (this.tableContent.nativeElement.scrollLeft - 640), behavior: 'smooth' });
  }

  scrollRight() {

    this.tableContent.nativeElement.scrollTo({ left: (this.tableContent.nativeElement.scrollLeft + 640), behavior: 'smooth' });
  }

  getDepartmentsData(pageEvent: PageEvent) {

     if(this.isAvailable && this.heading === "Departments")
    this.dataSource.loadDataAllBranchesData(this.branchIds, pageEvent.pageIndex, pageEvent.pageSize);
    else
     this.dataSource.loadData(this.branchId, pageEvent.pageIndex , pageEvent.pageSize); 
  }


  getDisplayedColumns(): string[] {

    return this.displayedColumns;
  }


}
