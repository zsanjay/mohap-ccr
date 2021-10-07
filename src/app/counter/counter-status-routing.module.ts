import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CounterStatusHospitalComponent } from "./counter-status-hospital/counter-status-hospital.component";
import { CounterStatusLiveComponent } from "./counter-status-live/counter-status-live.component";
import { ServedAndWaitingDeptCounterStatusComponent } from "./served-and-waiting-dept-counter-status/served-and-waiting-dept-counter-status.component";


const routes: Routes = [
    { path: '', component: CounterStatusHospitalComponent},
    { path: ':branchId/:branchName', component: CounterStatusLiveComponent },
    { path: ':branchId/:branchName/:page', component: ServedAndWaitingDeptCounterStatusComponent }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CounterStatusRoutingModule { }