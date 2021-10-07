import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { DataProvider } from 'src/app/data-provider';
import { AvgWaitingTimeBranch } from 'src/app/models/avgWaitingTimeBranch.model';
import { Region } from 'src/app/models/region.model';
import { FilterService } from 'src/app/services/filter.service';
import { RegionService } from 'src/app/services/regions.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-peak-hours-report-filter',
  templateUrl: './peak-hours-report-filter.component.html',
  styleUrls: ['./peak-hours-report-filter.component.css']
})
export class PeakHoursReportFilterComponent implements OnInit , OnDestroy {

  selectedBranch: string;
  selectedRegion: string = "1";
  selectedStartDate: string;
  selectedEndDate: string;

  startDate : Date;
  endDate : Date;

  branches : any[]; 
  regions : Region[]; 
  queues : AvgWaitingTimeBranch[];
  branchIds : number[];
  branchSubs : Subscription;
  regionSubs : Subscription;
  account : any;

  sortHLBranches : Subscription;

  constructor(private filterService : FilterService , private dataProvider : DataProvider , private regionService : RegionService , private utilityService : UtilityService) {
    //this.branches = [{"id":5,"name":"Abdullah Bin Omran for Maternity and Womens Hospita"},{"id":14,"name":"Al Amal for Mental Health Hospital"},{"id":12,"name":"Al Kuwait Hospital- Dubai"},{"id":19,"name":"Al Qarain Health Center"},{"id":6,"name":"AlDhaid Hospital"},{"id":2,"name":"AlQassimi Hospital"},{"id":4,"name":"AlQassimi Womens and Childrens Hospital"},{"id":18,"name":"Dibba Alfujairah Hospital"},{"id":7,"name":"Fujairah Hospital"},{"id":1,"name":"Ibrahim Bin Hamad Obaid Allah Hospital"},{"id":9,"name":"Kalba Hospital"},{"id":10,"name":"Khorfakkan Hospital"},{"id":3,"name":"Kuwait Hospital"},{"id":8,"name":"Masafi Hospital"},{"id":13,"name":"Saqr Hospital"},{"id":15,"name":"Shaam Hospital"},{"id":16,"name":"Umm Al-Quwain Hospital"},{"id":17,"name":"test"}];
   }
  

  ngOnInit(): void {

   // this.regions =[{"id":1,"name":"REGIONS","fullName":"REGIONS","description":null,"subgroupIds":[],"branchIds":[3,12,8,15,6,10,7,1,4,13,9,14,5,19,16,2,18]},{"id":51,"name":"DXB","fullName":"DXB","description":null,"subgroupIds":[],"branchIds":[12,14]},{"id":52,"name":"SHJ","fullName":"SHJ","description":null,"subgroupIds":[],"branchIds":[3,6,10,4,9,19,2]},{"id":53,"name":"AJM","fullName":"AJM","description":null,"subgroupIds":[],"branchIds":[]},{"id":54,"name":"RAK","fullName":"RAK","description":null,"subgroupIds":[],"branchIds":[15,1,13,5]},{"id":55,"name":"UMQ","fullName":"UMQ","description":null,"subgroupIds":[],"branchIds":[16]},{"id":56,"name":"FUJ","fullName":"FUJ","description":null,"subgroupIds":[],"branchIds":[8,7,18]}];
    
   //this.regionService.loadData("Regions");
   //this.regionService.loadData("Accounts");
  

   let regionData = this.dataProvider.getRegions();
   let accountData = this.dataProvider.getBranchAccessData();

  this.regionSubs = combineLatest(regionData, accountData).subscribe((res: any) => {
     let regions = res[0];
     let account = res[1];

     let filteredRegions: Region[] = [];

   if (account.branchIds.length == 0) {
     filteredRegions = regions;
   } else {
    regions = regions.filter((reg : any)  =>  reg.name !== "REGIONS");
      regions.forEach((region : any) => {
       if (this.utilityService.checkBranchIdExists(region.branchIds , account.branchIds)) {
         filteredRegions.push(region);
       }
     })
   }

   this.regions = filteredRegions;
   this.account = account;
   this.selectedRegion = this.regions[0].id.toString(); 
   this.branchIds = this.account.branchIds.length == 0 ? this.regions[0].branchIds : this.account.branchIds;
   this.filterService.changeBranchIds(this.account.branchIds.length == 0 ? this.regions[0].branchIds : this.account.branchIds);
   //this.regionService.loadData("Branches");

   }) 

  //  this.dataProvider.getBranches().pipe(
  //   map((data : any) => data.filter( (branch : any) => {
  //      return this.branchIds.indexOf(branch.id.toString()) > -1;
  //   })
  //   )
  //   ).subscribe(branches => {
  //    this.branches = branches;
  //  })

   this.branchSubs = this.dataProvider.getBranches().subscribe(branches => {
    if(this.account.branchIds.length > 0){
    this.branches = branches.filter((branch : any) => { 
      return this.regions[0].branchIds.indexOf(branch.id) > -1;
    })
    }else{
     this.branches = branches;
    }
    this.selectedBranch = this.branches[0].id.toString();
  })

  }

  onRegionChange(id : string){

    this.regions.forEach(region => {

      if(region.id == Number.parseInt(id)) {
        
        this.dataProvider.getBranchesById({
          branchIds : this.account.branchIds.length == 0 ? region.branchIds : this.utilityService.getBranchIds(region.branchIds , this.account.branchIds),
          sort : '0',
          firstSort : false
        }).subscribe(res =>  {
          this.branches = res;
          this.selectedBranch = "0";
        });

       // this.filterService.changeBranchIds(region.branchIds);
      }
    })
    
  }

  onBranchChange(id : string){
  
   if(id == "0"){
      this.regions.forEach(region => {
        
        if(region.id == Number.parseInt(this.selectedRegion)){
          this.branchIds = this.account.branchIds.length == 0 ? region.branchIds : this.utilityService.getBranchIds(region.branchIds , this.account.branchIds);
          this.selectedStartDate = "";
          this.selectedEndDate = "";
          this.startDate = new Date("");
          this.endDate = new Date("");
          //this.filterService.changeBranchIds(region.branchIds);
        }
      })
    }
    else{
      this.startDate = new Date("");
      this.endDate = new Date("");
      this.selectedStartDate = "";
      this.selectedEndDate = "";
      this.branchIds = [Number.parseInt(id)];
      //this.filterService.onChangeBranchDept(Number.parseInt(id)); 
    }

  }

  onStartDateChange(event : any){
    
  this.selectedStartDate = this.getDate(event);
  
  }

  onEndDateChange(event : any){

    this.selectedEndDate = this.getDate(event);

    if(this.branchIds != null && this.selectedStartDate != null){
    this.filterService.onChangeHeapFilter({
      branchIds : this.branchIds,
      startDate : this.selectedStartDate,
      endDate : this.selectedEndDate
    });
  }

  }

  getDate(event : any){

    let date = event.target.value;

    var yyyy = date.getFullYear();
    var mm = date.getMonth() + 1; 
    var dd = date.getDate();
  
    if(mm < 10){
      mm = "0" + mm;
    }
  
    if(dd < 10){
      dd = "0" + dd;
    }

    return yyyy +""+ mm +""+ dd;

  }

  ngOnDestroy(): void {
   this.branchSubs.unsubscribe();
   this.regionSubs.unsubscribe();
  }


}
