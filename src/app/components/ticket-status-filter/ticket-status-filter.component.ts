import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DataProvider } from 'src/app/data-provider';
import { Queue } from 'src/app/models/queue.model';
import { FilterService } from 'src/app/services/filter.service';
import { RegionService } from 'src/app/services/regions.service';

@Component({
  selector: 'app-ticket-status-filter',
  templateUrl: './ticket-status-filter.component.html',
  styleUrls: ['./ticket-status-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketStatusFilterComponent implements OnInit , OnDestroy {
  
  selectedBranch: string;
  selectedQueueWaiting : string;
  selectedQueueServed : string;
  selectedQueueOthers : string;

  waitingTab = false;
  servedTab = false;
  othersTab = false;

  branches : any[];

  waitingQueues : Queue[];
  servedQueues : Queue[];
  othersQueues : Queue[];

  branchIds : number[];
  // branchIdsServed : number[];
  // branchIdsOthers : number[];

  branchSubs : Subscription;
  filterSubs : Subscription;

  constructor(private filterService : FilterService , private route : ActivatedRoute , private dataProvider : DataProvider 
    , private regionService : RegionService , private changeDetectorRef: ChangeDetectorRef) {
   //this.branches = [{"id":5,"name":"Abdullah Bin Omran for Maternity and Womens Hospita"},{"id":14,"name":"Al Amal for Mental Health Hospital"},{"id":12,"name":"Al Kuwait Hospital- Dubai"},{"id":19,"name":"Al Qarain Health Center"},{"id":6,"name":"AlDhaid Hospital"},{"id":2,"name":"AlQassimi Hospital"},{"id":4,"name":"AlQassimi Womens and Childrens Hospital"},{"id":18,"name":"Dibba Alfujairah Hospital"},{"id":7,"name":"Fujairah Hospital"},{"id":1,"name":"Ibrahim Bin Hamad Obaid Allah Hospital"},{"id":9,"name":"Kalba Hospital"},{"id":10,"name":"Khorfakkan Hospital"},{"id":3,"name":"Kuwait Hospital"},{"id":8,"name":"Masafi Hospital"},{"id":13,"name":"Saqr Hospital"},{"id":15,"name":"Shaam Hospital"},{"id":16,"name":"Umm Al-Quwain Hospital"},{"id":17,"name":"test"}];
   }

  ngOnInit(): void {

    this.route.params.forEach(param => {

      if(param['tab'] == "waitingTab"){

        this.waitingTab = true;
        this.servedTab = false;
        this.othersTab = false;

      if(param['selectedbranchId'])
        this.selectedBranch = param['selectedbranchId'];
      if(param['queueId'])
        this.selectedQueueWaiting = param['queueId'];
      if(param['branchIds'] && param['branchIds'] != "undefined")  
        this.branchIds = param['branchIds'].split(",");

      }
      else if(param['tab'] == "servedTab"){
      
      this.servedTab = true;
      this.waitingTab = false;
      this.othersTab = false;

      if(param['selectedbranchId'])
      this.selectedBranch = param['selectedbranchId'];
      if(param['queueId'])
      this.selectedQueueServed = param['queueId'];
      if(param['branchIds'] && param['branchIds'] != "undefined")  
      this.branchIds = param['branchIds'].split(",");

      }
      else{
      
      this.othersTab = true;
      this.waitingTab = false;
      this.servedTab = false;

      if(param['selectedbranchId'])
      this.selectedBranch = param['selectedbranchId'];
      if(param['queueId'])
      this.selectedQueueOthers = param['queueId'];
      if(param['branchIds'] && param['branchIds'] != "undefined")  
      this.branchIds = param['branchIds'].split(",");

      }

    }) 

  //  this.regionService.loadData("Branches");

    if(this.branchIds != undefined){
      this.branchSubs = this.dataProvider.getBranches().pipe(
     map((data : any) => data.filter( (branch : any) => {
        return this.branchIds.indexOf(branch.id.toString()) > -1;
     })
     )
     ).subscribe(branches => {
      this.branches = branches;

      if(this.waitingTab)
      this.getWaitingQueues(this.selectedBranch , false , this.selectedQueueWaiting);
      else if(this.servedTab)
      this.getServedQueues(this.selectedBranch , false , this.selectedQueueServed);
      else
      this.getOthersQueues(this.selectedBranch , false , this.selectedQueueOthers);

    })
  }
  else{
    this.branchSubs = this.dataProvider.getBranches().subscribe(branches => {
       this.branches = branches;

       if(this.waitingTab && this.selectedBranch != undefined){
       this.getWaitingQueues(this.selectedBranch , true , this.selectedQueueWaiting);
       }
       else if(this.waitingTab && this.selectedBranch == undefined){
        this.selectedBranch = this.branches[0].id;
        this.getWaitingQueues(this.selectedBranch , true , this.selectedQueueWaiting);
       }

       if(this.servedTab && this.selectedBranch == undefined){
        this.selectedBranch = this.branches[0].id;
        this.getServedQueues(this.selectedBranch , true , this.selectedQueueServed);
       }
       else if(this.servedTab && this.selectedBranch != undefined){
        this.getServedQueues(this.selectedBranch , true , this.selectedQueueServed);
       }

       if(this.othersTab && this.selectedBranch == undefined){
        this.selectedBranch = this.branches[0].id;
        this.getOthersQueues(this.selectedBranch , true , this.selectedQueueOthers);
       }
       else if(this.othersTab && this.selectedBranch != undefined){
        this.getOthersQueues(this.selectedBranch , true , this.selectedQueueOthers);
       }

     })
  }

  this.filterSubs =  this.filterService.filterSubObs.subscribe(branchData => {

    if(branchData.name == "Waiting"){
      
      this.waitingTab = true;
      this.servedTab = false;
      this.othersTab = false;
      this.selectedBranch = branchData.id.toString();
      this.getWaitingQueues(this.selectedBranch , false , branchData.deptId.toString());

    }
    else if(branchData.name == "Served"){

      this.waitingTab = false;
      this.servedTab = true;
      this.othersTab = false;
      this.selectedBranch = branchData.id.toString();
      this.getServedQueues(this.selectedBranch , false , branchData.deptId.toString());
    }
    else{
      this.waitingTab = false;
      this.servedTab = false;
      this.othersTab = true;
      this.selectedBranch = branchData.id.toString();
      this.getOthersQueues(this.selectedBranch , false , branchData.deptId.toString());
    }
  })
  
  }

  onBranchChange(id : string){

    if(this.waitingTab){

    this.selectedQueueWaiting = "0";
    this.dataProvider.getTicketStatusWaitingQueuesByBranchId( Number.parseInt(id)).pipe(
      catchError(() => of([]))
    )
    .subscribe(res =>  {
      res.splice(0, 0, {
        id : 0,
        name : "----------- Select Queue Name --------------",
        served : 0,
        waiting : 0,
        others : 0
      });
        this.waitingQueues = res;
    });

    }
    else if(this.servedTab){

      this.selectedQueueServed = "0";

      this.dataProvider.getTicketStatusServedQueuesByBranchId( Number.parseInt(id)).pipe(
        catchError(() => of([]))
      )
      .subscribe(res =>  {
        res.splice(0, 0, {
          id : 0,
          name : "----------- Select Queue Name --------------",
          served : 0,
          waiting : 0,
          others : 0
        });
          this.servedQueues = res;
        });
    }
    else{

      this.selectedQueueOthers = "0";

      this.dataProvider.getTicketStatusOthersQueuesByBranchId( Number.parseInt(id)).pipe(
        catchError(() => of([]))
      )
      .subscribe(res =>  {
        res.splice(0, 0, {
          id : 0,
          name : "----------- Select Queue Name --------------",
          served : 0,
          waiting : 0,
          others : 0
        });
          this.othersQueues = res;
        });
    }
  }

  onQueueChange(id : string){

    let selectedQueue = "";

    this.waitingQueues.forEach(queues => {
      if(queues.id === Number.parseInt(id)){
        selectedQueue = queues.name;
      }
    })
  
  this.filterService.onTSWaitingDeptChange({
    branchId : Number.parseInt(this.selectedBranch),
    deptId : Number.parseInt(id),
    deptName : selectedQueue

  });

  }

  onQueueChangeServed(id : string){

    let selectedQueue = "";

    this.servedQueues.forEach(queues => {
      if(queues.id === Number.parseInt(id)){
        selectedQueue = queues.name;
      }
    })
  
    this.filterService.onTSWaitingDeptChange({
      branchId : Number.parseInt(this.selectedBranch),
      deptId : Number.parseInt(id),
      deptName : selectedQueue
    });
  
    }

    onQueueChangeOthers(id : string){

    let selectedQueue = "";

    this.othersQueues.forEach(queues => {
      if(queues.id === Number.parseInt(id)){
        selectedQueue = queues.name;
      }
    })
  
      this.filterService.onTSWaitingDeptChange({
        branchId : Number.parseInt(this.selectedBranch),
        deptId : Number.parseInt(id),
        deptName : selectedQueue
      });
    
      }

  getWaitingQueues(branchId : string , fetchData : boolean , deptId : string){

    this.dataProvider.getTicketStatusWaitingQueuesByBranchId( Number.parseInt(branchId)).pipe(
      catchError(() => of([]))
    )
    .subscribe((res : Queue[])=> {

      res.splice(0, 0, {
        id : 0,
        name : "----------- Select Queue Name --------------",
        served : 0,
        waiting : 0,
        others : 0
      });

      this.waitingQueues = res;

        if(fetchData && this.selectedQueueWaiting == undefined){
          this.selectedQueueWaiting = this.waitingQueues[1].id.toString();
          this.onQueueChange(this.waitingQueues[1].id.toString());
        }
      })
      .add(() => {

        if(fetchData && this.selectedQueueWaiting != undefined)
        this.selectedQueueWaiting = deptId;
        else if(!fetchData)
        this.selectedQueueWaiting = deptId;
        
        this.changeDetectorRef.detectChanges();

   });
  }

  getServedQueues(branchId : string , fetchData : boolean , deptId : string){

    this.dataProvider.getTicketStatusServedQueuesByBranchId( Number.parseInt(branchId)).pipe(
      catchError(() => of([]))
    )
    .subscribe(res => {

      res.splice(0, 0, {
        id : 0,
        name : "----------- Select Queue Name --------------",
        served : 0,
        waiting : 0,
        others : 0
      });
        this.servedQueues = res;
        if(fetchData && this.selectedQueueServed == undefined){
          this.selectedQueueServed = this.servedQueues[1].id.toString();
          this.onQueueChangeServed(this.servedQueues[1].id.toString());
        }
      }).add(() => {        
          
          if(fetchData && this.selectedQueueServed != undefined)
          this.selectedQueueServed = deptId;
          else if(!fetchData)
          this.selectedQueueServed = deptId;

          this.changeDetectorRef.detectChanges();
       
   });
  }

  getOthersQueues(branchId : string , fetchData : boolean , deptId : string){

    this.dataProvider.getTicketStatusOthersQueuesByBranchId( Number.parseInt(branchId)).pipe(
      catchError(() => of([]))
    )
    .subscribe(res => {

      res.splice(0, 0, {
        id : 0,
        name : "----------- Select Queue Name --------------",
        served : 0,
        waiting : 0,
        others : 0
      });
        this.othersQueues = res;
        if(fetchData && this.selectedQueueOthers == undefined){
          this.selectedQueueOthers = this.othersQueues[1].id.toString();
          this.onQueueChangeOthers(this.othersQueues[1].id.toString());
        }
      }).add(() => {

        if(fetchData && this.selectedQueueOthers != undefined)
        this.selectedQueueOthers = deptId;
        else if(!fetchData)
        this.selectedQueueOthers = deptId;

        this.changeDetectorRef.detectChanges(); 
   });

      
  }

  ngOnDestroy(): void {
   this.branchSubs.unsubscribe();
   this.filterSubs.unsubscribe();
  }

}
