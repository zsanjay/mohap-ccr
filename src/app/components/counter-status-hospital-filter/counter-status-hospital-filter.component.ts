import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { DataProvider } from 'src/app/data-provider';
import { Region } from 'src/app/models/region.model';
import { FilterService } from 'src/app/services/filter.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-counter-status-hospital-filter',
  templateUrl: './counter-status-hospital-filter.component.html',
  styleUrls: ['./counter-status-hospital-filter.component.css']
})
export class CounterStatusHospitalFilterComponent implements OnInit , OnDestroy {

  selectedRegion: string = "1";
  regions : Region[];
  account : any;
  regionSubs : Subscription;

  constructor(private dataProvider : DataProvider , private filterService : FilterService , private utilityService : UtilityService) { }
 

  ngOnInit(): void {

    // this.regions =[{"id":1,"name":"REGIONS","fullName":"REGIONS","description":null,"subgroupIds":[],"branchIds":[3,12,8,15,6,10,7,1,4,13,9,14,5,19,16,2,18]},{"id":51,"name":"DXB","fullName":"DXB","description":null,"subgroupIds":[],"branchIds":[12,14]},{"id":52,"name":"SHJ","fullName":"SHJ","description":null,"subgroupIds":[],"branchIds":[3,6,10,4,9,19,2]},{"id":53,"name":"AJM","fullName":"AJM","description":null,"subgroupIds":[],"branchIds":[]},{"id":54,"name":"RAK","fullName":"RAK","description":null,"subgroupIds":[],"branchIds":[15,1,13,5]},{"id":55,"name":"UMQ","fullName":"UMQ","description":null,"subgroupIds":[],"branchIds":[16]},{"id":56,"name":"FUJ","fullName":"FUJ","description":null,"subgroupIds":[],"branchIds":[8,7,18]}];

     // this.regionService.loadData("Regions");
     // this.regionService.loadData("Accounts");

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
      this.filterService.changeBranchIds(account.branchIds.length == 0 ? 
        this.regions[0].branchIds  : this.utilityService.getBranchIds(this.regions[0].branchIds , account.branchIds));

      }) 
  }

  onRegionChange(id : string){

    this.regions.forEach(region => {

      if(region.id == Number.parseInt(id)) {

      this.filterService.changeBranchIds(this.account.branchIds.length == 0 ? 
        region.branchIds : this.utilityService.getBranchIds(region.branchIds , this.account.branchIds));
      }
    })
    
  }

  ngOnDestroy(): void {
   this.regionSubs.unsubscribe();
  }

}
