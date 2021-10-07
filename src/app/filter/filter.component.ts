import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { DataProvider } from '../data-provider';
import { Region } from '../models/region.model';
import { FilterService } from '../services/filter.service';
import { RegionService } from '../services/regions.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit , OnDestroy  {


  selectedRegion: string = "";
  selectedSorting : string = "0";

  sort: string[] = [ "Low-High" , "High-Low"];

  regions : Region[]; 
  sortHLSubs : Subscription;
  regionSubs : Subscription;
  showSort : boolean = false; 
  account : any;

  constructor(private filterService : FilterService , private dataProvider : DataProvider ,private regionService : RegionService , private route : ActivatedRoute , private utilityService : UtilityService) {
     
   }
  

  ngOnInit(): void {

 // this.regions =[{"id":1,"name":"REGIONS","fullName":"REGIONS","description":null,"subgroupIds":[],"branchIds":[3,12,8,15,6,10,7,1,4,13,9,14,5,19,16,2,18]},{"id":51,"name":"DXB","fullName":"DXB","description":null,"subgroupIds":[],"branchIds":[12,14]},{"id":52,"name":"SHJ","fullName":"SHJ","description":null,"subgroupIds":[],"branchIds":[3,6,10,4,9,19,2]},{"id":53,"name":"AJM","fullName":"AJM","description":null,"subgroupIds":[],"branchIds":[]},{"id":54,"name":"RAK","fullName":"RAK","description":null,"subgroupIds":[],"branchIds":[15,1,13,5]},{"id":55,"name":"UMQ","fullName":"UMQ","description":null,"subgroupIds":[],"branchIds":[16]},{"id":56,"name":"FUJ","fullName":"FUJ","description":null,"subgroupIds":[],"branchIds":[8,7,18]}];
    
  this.route.params.forEach(param => {
    let selectSort = param['showSort'];
    this.showSort = (selectSort === "true");

    if(param['regionId'])
    this.selectedRegion = param['regionId'];
    
    }) 

      let regionData = this.dataProvider.getRegions();
      let accountData = this.dataProvider.getBranchAccessData();

    this.regionSubs = combineLatest(regionData, accountData).subscribe((res: any) => {

        let regions = res[0];
        let account = res[1];

        let filteredRegions: Region[] = [];

      if (account.branchIds.length == 0) {
        filteredRegions = regions;
        if(this.selectedRegion == ""){

        this.filterService.changeBranchIds(regions[0].branchIds);
        this.filterService.changeRegion({
          branchIds : regions[0].branchIds,
          sort : this.selectedSorting,
          firstSort : false
        });
      }
      else{
          regions.forEach((r : any) => {

          if(r.id == Number.parseInt(this.selectedRegion)) {
            this.filterService.changeRegion({
              branchIds : r.branchIds,
              sort : this.selectedSorting,
              firstSort : false
            });
    
            this.filterService.changeBranchIds(r.branchIds);  
          }
      });
      }
     } else {

       regions = regions.filter((reg : any)  =>  reg.name !== "REGIONS");
       regions.forEach((region : any)=> {
        if (this.utilityService.checkBranchIdExists(region.branchIds , account.branchIds)) {
          filteredRegions.push(region);
        }
      })
        if(this.selectedRegion == ""){
          let branchIds = this.utilityService.getBranchIds(filteredRegions[0].branchIds , account.branchIds);
          this.filterService.changeRegion({
            branchIds : branchIds,
            sort : this.selectedSorting,
            firstSort : false
          });
          this.filterService.changeBranchIds(branchIds);
        }
      else{
        filteredRegions.forEach((r : any) => {
          if(r.id == Number.parseInt(this.selectedRegion)) {
            let branchIds = this.utilityService.getBranchIds( r.branchIds , account.branchIds);
            this.filterService.changeRegion({
              branchIds :branchIds,
              sort : this.selectedSorting,
              firstSort : false
            });

            this.filterService.changeBranchIds(branchIds);  
          }
      });
      }
      }

      this.regions = filteredRegions;

      if(this.selectedRegion == "")
      this.selectedRegion = this.regions[0].id.toString();
      this.account = account;

      })


    this.sortHLSubs = this.filterService.sortHL.subscribe(sort => {
      this.selectedSorting = sort;
    })

  }

  onRegionChange(id : string){

    this.regions.forEach(region => {

      if(region.id == Number.parseInt(id)) {

        let branchIds = this.utilityService.getBranchIds(region.branchIds , this.account.branchIds);

        this.filterService.changeRegion({
          branchIds : branchIds,
          sort : this.selectedSorting,
          firstSort : false
        });

        this.filterService.changeBranchIds(branchIds);
      }
    })
  }

  onSortChange(id : string){

    this.regions.forEach(region => {
      
      if(region.id == Number.parseInt(this.selectedRegion)) {
        let branchIds = this.utilityService.getBranchIds(region.branchIds , this.account.branchIds);

        this.filterService.changeSort({
          branchIds : branchIds,
          sort : id,
          firstSort : false
        });

        this.filterService.changeBranchIds(branchIds);
        
      }
    })
  }

  ngOnDestroy(): void {
    this.sortHLSubs.unsubscribe();
    this.regionSubs.unsubscribe();
  }

}