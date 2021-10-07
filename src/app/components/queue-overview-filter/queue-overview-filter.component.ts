import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataProvider } from 'src/app/data-provider';
import { FilterService } from 'src/app/services/filter.service';
import { RegionService } from 'src/app/services/regions.service';

@Component({
  selector: 'app-queue-overview-filter',
  templateUrl: './queue-overview-filter.component.html',
  styleUrls: ['./queue-overview-filter.component.css']
})
export class QueueOverviewFilterComponent implements OnInit , OnDestroy {

  selectedBranch: string = "1";

  branches : any[];  
  branchSubs : Subscription;
  branchIds : number[];

  constructor(private filterService : FilterService , private route : ActivatedRoute , private regionService : RegionService , private dataProvider : DataProvider) {
   //this.branches = [{"id":5,"name":"Abdullah Bin Omran for Maternity and Womens Hospita"},{"id":14,"name":"Al Amal for Mental Health Hospital"},{"id":12,"name":"Al Kuwait Hospital- Dubai"},{"id":19,"name":"Al Qarain Health Center"},{"id":6,"name":"AlDhaid Hospital"},{"id":2,"name":"AlQassimi Hospital"},{"id":4,"name":"AlQassimi Womens and Childrens Hospital"},{"id":18,"name":"Dibba Alfujairah Hospital"},{"id":7,"name":"Fujairah Hospital"},{"id":1,"name":"Ibrahim Bin Hamad Obaid Allah Hospital"},{"id":9,"name":"Kalba Hospital"},{"id":10,"name":"Khorfakkan Hospital"},{"id":3,"name":"Kuwait Hospital"},{"id":8,"name":"Masafi Hospital"},{"id":13,"name":"Saqr Hospital"},{"id":15,"name":"Shaam Hospital"},{"id":16,"name":"Umm Al-Quwain Hospital"},{"id":17,"name":"test"}];
   }

  ngOnInit(): void {

    this.route.params.forEach((param : any) => {
     this.selectedBranch = param['branchId'];

     if(param['branchIds'])
     this.branchIds = param['branchIds'].split(",");

    }) 

     //this.regionService.loadData("Queue");

     if(this.branchIds != undefined){
      this.branchSubs = this.dataProvider.getBranches().pipe(
        map((data : any) => data.filter( (branch : any) => {
           return this.branchIds.indexOf(branch.id.toString()) > -1;
        })
        )
        ).subscribe(branches => {
         this.branches = branches;
       })
      }
      else{
        this.branchSubs = this.dataProvider.getBranches()
        .subscribe(branches => {
           this.branches = branches;
         })
      }

  }

  
  onBranchChange(id : string){
   this.filterService.changeBranchId(Number.parseInt(id));
  }


  ngOnDestroy(): void {
    this.branchSubs.unsubscribe();
  }
}