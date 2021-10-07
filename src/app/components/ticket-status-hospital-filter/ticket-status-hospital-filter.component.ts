import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataProvider } from 'src/app/data-provider';
import { AvgWaitingTimeBranch } from 'src/app/models/avgWaitingTimeBranch.model';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-ticket-status-hospital-filter',
  templateUrl: './ticket-status-hospital-filter.component.html',
  styleUrls: ['./ticket-status-hospital-filter.component.css']
})
export class TicketStatusHospitalFilterComponent implements OnInit , OnDestroy {

  selectedBranch: string = "0";
  branches : any[]; 
  queues : AvgWaitingTimeBranch[];
  branchIds : number[];
  branchSubs : Subscription;
  sortHLBranches : Subscription;
  branchId : number;

  constructor(private filterService : FilterService , private route : ActivatedRoute , private dataProvider : DataProvider) {
  // this.branches = [{"id":5,"name":"Abdullah Bin Omran for Maternity and Womens Hospita"},{"id":14,"name":"Al Amal for Mental Health Hospital"},{"id":12,"name":"Al Kuwait Hospital- Dubai"},{"id":19,"name":"Al Qarain Health Center"},{"id":6,"name":"AlDhaid Hospital"},{"id":2,"name":"AlQassimi Hospital"},{"id":4,"name":"AlQassimi Womens and Childrens Hospital"},{"id":18,"name":"Dibba Alfujairah Hospital"},{"id":7,"name":"Fujairah Hospital"},{"id":1,"name":"Ibrahim Bin Hamad Obaid Allah Hospital"},{"id":9,"name":"Kalba Hospital"},{"id":10,"name":"Khorfakkan Hospital"},{"id":3,"name":"Kuwait Hospital"},{"id":8,"name":"Masafi Hospital"},{"id":13,"name":"Saqr Hospital"},{"id":15,"name":"Shaam Hospital"},{"id":16,"name":"Umm Al-Quwain Hospital"},{"id":17,"name":"test"}];
   }

  ngOnInit(): void {

    this.route.params.forEach(param => {
     this.branchId =  param['branchId'];
     this.selectedBranch = this.branchId.toString();

     if(param['branchIds'])
     this.branchIds = param['branchIds'].split(",");
    });

   // this.regionService.loadData("Branches");

    if(this.branchIds != undefined){
      this.branchSubs = this.dataProvider.getBranches().pipe(
        map((data : any) => data.filter( (branch : any) => {
           return this.branchIds.indexOf(branch.id.toString()) > -1;
        })
        )
        ).subscribe(branches => {
         this.branches = branches;
         this.filterService.changeBranchId(this.branchId);
       })
      }
      else{
        this.branchSubs = this.dataProvider.getBranches()
        .subscribe(branches => {
           this.branches = branches;
           this.filterService.changeBranchId(this.branchId);
         })
      }

  }

  onBranchChange(id : string){
  this.filterService.onChangeBranchDept(Number.parseInt(id)); 
  }

  ngOnDestroy(): void {
   this.branchSubs.unsubscribe();
  }

}
