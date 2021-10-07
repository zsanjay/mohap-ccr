import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AverageTransactionTimeBranchComponent } from "./average-transaction-time-branch/average-transaction-time-branch.component";
import { AverageTransactionTimeQueuesComponent } from "./average-transaction-time-queues/average-transaction-time-queues.component";


const routes: Routes = [
  //  { path: '', component: AverageTransactionTimeComponent },
    { path: ':sort', component: AverageTransactionTimeBranchComponent },
    { path: ':sort/:branchId/:branchName', component: AverageTransactionTimeQueuesComponent }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AverageTransactionTimeRoutingModule { }