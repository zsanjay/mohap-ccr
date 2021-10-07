import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { BranchDeptFilter } from '../models/branch-dept-filter';
import { BranchFilterCriteria } from '../models/branchFilterCriteria.model';
import { FilterCriteria } from '../models/filterCriteria.model';
import { HeapFilterCriteria } from '../models/heap-filter.model';
import { TicketStatusFilter } from '../models/ticket-status-filter.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  public filterByRegion = new Subject<FilterCriteria>();
  region = this.filterByRegion.asObservable();

  public sortByWaitingTime = new Subject<FilterCriteria>();
  sortWaitingTime = this.sortByWaitingTime.asObservable();

  private sortHighAndLow = new BehaviorSubject<string>("");
  sortHL = this.sortHighAndLow.asObservable()

  
  private sortHighAndLowBranches = new BehaviorSubject<string>("");
  sortHLBranches = this.sortHighAndLowBranches.asObservable()

  public filterByBranch = new Subject<BranchFilterCriteria>();
  branch = this.filterByBranch.asObservable();

  public sortByBranch = new Subject<BranchFilterCriteria>();
  sortBranch = this.sortByBranch.asObservable();

  public branchIdSubject = new Subject<number[]>();
  branchIds = this.branchIdSubject.asObservable();

  public branchIdSub = new Subject<number>();
  branchId = this.branchIdSub.asObservable();

  public queueBranchIdSubject = new Subject<number[]>();
  queueBranchIds = this.queueBranchIdSubject.asObservable();

  // public tsWaitingBranch = new Subject<BranchDeptFilter>();
  // tsWaitingBranchId = this.tsWaitingBranch.asObservable();

  public tsWaitingDept = new Subject<BranchDeptFilter>();
  tsWaitingDeptId = this.tsWaitingDept.asObservable();

  public filterSub = new Subject<TicketStatusFilter>();
  filterSubObs = this.filterSub.asObservable();

  public filterDeptmentSub = new Subject<number>();
  filterDeptmentSubObs = this.filterDeptmentSub.asObservable();

  public filterHeapSub = new Subject<HeapFilterCriteria>();
  filterHeapSubObs = this.filterHeapSub.asObservable();
  
  constructor() { }
  
  changeRegion(criteria: FilterCriteria) {
    this.filterByRegion.next(criteria);
  }

  changeSort(criteria: FilterCriteria){
    this.sortByWaitingTime.next(criteria);
  }

  changeHLFilter(selectedSorting:string){
    this.sortHighAndLow.next(selectedSorting);
  }

  changeBranch(criteria : BranchFilterCriteria){
    this.filterByBranch.next(criteria);
  }

  changeBranchSort(criteria : BranchFilterCriteria){
    this.sortByBranch.next(criteria);
  }

  changeHLFilterBranches(selectedSorting:string){
    this.sortHighAndLowBranches.next(selectedSorting);
  }

  changeBranchIds(branchIds : number[]){
    this.branchIdSubject.next(branchIds);
  }

  changeBranchId(branchId : number){
    this.branchIdSub.next(branchId);
  }

  changeQueueBranchIds(branchIds : number[]){
    this.queueBranchIdSubject.next(branchIds);
  }

  // onTSWaitingBranchChange(filter : BranchDeptFilter){
  //   this.tsWaitingBranch.next(filter);
  // }

  onTSWaitingDeptChange(filter : BranchDeptFilter){
    this.tsWaitingDept.next(filter);
  }

  changeTab(data : TicketStatusFilter){
    this.filterSub.next(data);
  }

  onChangeBranchDept(branchId : number){
    this.filterDeptmentSub.next(branchId);
  }

  onChangeHeapFilter(data : HeapFilterCriteria){
    this.filterHeapSub.next(data);
  }

}

