import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataProvider } from 'src/app/data-provider';
import { Branch } from 'src/app/models/branch.model';
import { UtilityService } from 'src/app/services/utility.service';
import { BranchesDataSource } from './branches-datasource';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements AfterViewInit, OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Branch>;
  dataSource : BranchesDataSource;
  isAvailable: boolean = true;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'served' , 'waiting' , 'wtTime' , 'trtTime'];

constructor(private dataProvider : DataProvider , private utilityService : UtilityService){}


  ngOnInit() {

    this.dataSource = new BranchesDataSource(this.dataProvider);
    this.dataSource.loadData();
    
  }

  ngAfterViewInit() {

    if(this.isAvailable && this.dataSource != null){
    this.dataSource.sort = this.sort;
    this.table.dataSource = this.dataSource;
    }
  }

  sortData(sort : Sort){
    this.dataSource.getSortedData(sort);
  }

  getWtTime(wtTime : number){
  return this.utilityService.getAverageTime(wtTime);
  }

  getFirstLetter(item : string){
  return this.utilityService.getFirstLetter(item);
  }

  getColor(index : number){
    return this.utilityService.getColor(index);
  }

  getTimeColor(timeInSec : number){
    return this.utilityService.getTimeColor(timeInSec);
  }
}
