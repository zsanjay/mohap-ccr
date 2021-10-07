import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ServedAndWaitingDepartmentsComponent } from "./served-and-waiting-departments/served-and-waiting-departments.component";

const routes: Routes = [
    { path: '', component: ServedAndWaitingDepartmentsComponent },
    { path: ':page', component: ServedAndWaitingDepartmentsComponent },
    { path: ':branchId', component: ServedAndWaitingDepartmentsComponent }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ServedAndWaitingDepartmentsRoutingModule {}