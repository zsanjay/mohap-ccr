import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AvgWaitingTimeMainComponent } from "./avg-waiting-time-main/avg-waiting-time-main.component";
import { AvgWaitingTimeQueuesComponent } from "./avg-waiting-time-queues/avg-waiting-time-queues.component";

const routes: Routes = [
    { path: ':sort', component: AvgWaitingTimeMainComponent },
    { path: ':sort/:branchId/:branchName', component: AvgWaitingTimeQueuesComponent }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AverageWaitingTimeRoutingModule { }