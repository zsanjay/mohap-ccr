import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TicketStatusHospitalComponent } from "./ticket-status-hospital/ticket-status-hospital.component";
import { TicketStatusComponent } from "./ticket-status/ticket-status.component";

const routes: Routes = [
    { path: '', component: TicketStatusHospitalComponent},
    { path: ':tab', component: TicketStatusComponent },
    { path: ':branchId/:queueId/:queueName/:tab', component: TicketStatusComponent }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TicketStatusRoutingModule { }