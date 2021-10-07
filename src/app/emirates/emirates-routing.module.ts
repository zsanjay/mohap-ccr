import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmiratesBranchesComponent } from "./emirates-branches/emirates-branches.component";
import { EmiratesComponent } from "./emirates/emirates.component";

const routes: Routes = [
    { path: '', component: EmiratesComponent },
    { path: ':branchIds', component: EmiratesBranchesComponent }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class EmiratesRoutingModule { }