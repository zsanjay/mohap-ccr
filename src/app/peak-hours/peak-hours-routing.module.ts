import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PeakHoursReportComponent } from "./peak-hours-report/peak-hours-report.component";

const routes: Routes = [
    { path: '', component: PeakHoursReportComponent}
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PeekHoursRoutingModule { }