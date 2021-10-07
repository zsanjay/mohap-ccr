import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BranchesOverviewComponent } from "./branches-overview/branches-overview.component";
import { QueuesOverviewComponent } from "./queues-overview/queues-overview.component";

const routes: Routes = [
    { path: '', component: BranchesOverviewComponent },
    { path : ':branchId/:branchName' , component: QueuesOverviewComponent } 
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class BranchesRoutingModule { }