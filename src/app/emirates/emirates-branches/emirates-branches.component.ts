import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataProvider } from 'src/app/data-provider';
import { FilterService } from 'src/app/services/filter.service';
import { UtilityService } from 'src/app/services/utility.service';
import { BranchDataSource } from './branch-datasource';

@Component({
  selector: 'app-emirates-branches',
  templateUrl: './emirates-branches.component.html',
  styleUrls: ['./emirates-branches.component.css']
})
export class EmiratesBranchesComponent implements OnInit {

  displayedColumns = ['name', 'served' , 'waiting' , 'noshows'];
  hospitalColors = ['blue' , 'purple' , 'green' , 'orange'];
  dataSource : BranchDataSource;
  @ViewChild(MatSort) sort!: MatSort;
  backImage = "assets/images/less-than.png";
  branchId : number;
  branchIdSubs : Subscription;
  branchIdsParam : string[];
  branchIds : number[] = [];
  regionId : string;

  constructor(private dataProvider : DataProvider , private filterService : FilterService , private route : ActivatedRoute , private utilityService : UtilityService) {

   }

  ngOnInit(): void {

     this.route.params.forEach(param => {
    this.branchIdsParam = param['branchIds'].split(",");
     
    this.branchIdsParam.forEach(id => {
     this.branchIds.push(Number.parseInt(id));
    })
    
   })    

    this.dataSource = new BranchDataSource(this.dataProvider , this.filterService);
      //this.dataSource.loadData(this.branchIds);

  }

  ngAfterViewInit() {

  this.dataSource.sort = this.sort;

  this.branchIdSubs = this.filterService.branchIds.subscribe(branchIds => {
      this.branchIds = branchIds;
      this.dataSource.loadData(this.branchIds);
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

  ngOnDestroy(): void {
    this.branchIdSubs.unsubscribe();
  }


}

