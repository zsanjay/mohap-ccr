import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { DataProvider } from "../data-provider";
import { Branch } from "../models/branch.model";
import { Region } from "../models/region.model";

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  public data = new Subject<Region[]>();

  public branches = new Subject<Branch[]>();

  public queueBranches = new Subject<Branch[]>();

  public accountBranchIds = new Subject<any>();

  constructor(private dataProvider: DataProvider) {

  }

  loadData(value: string) {

    if (value == "Regions") {
      this.dataProvider.getRegions().subscribe(res => {
        this.data.next(res);
      });
    }else if(value == "Queue"){
      this.dataProvider.getBranches().subscribe(res => this.queueBranches.next(res));
    }else if(value == "Accounts"){
      this.dataProvider.getBranchAccessData().subscribe(res => this.accountBranchIds.next(res));
    }
    else {
      this.dataProvider.getBranches().subscribe(res => this.branches.next(res));
    }
  }

}