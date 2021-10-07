import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "../shared/shared.module";
import { BranchesOverviewComponent } from "./branches-overview/branches-overview.component";
import { BranchesRoutingModule } from "./branches-routing.module";
import { QueuesOverviewComponent } from "./queues-overview/queues-overview.component";


@NgModule({
    imports: [
        BranchesRoutingModule,
        SharedModule,
        RouterModule,
        CommonModule,
        TranslateModule
    ],
    declarations: [
        BranchesOverviewComponent,
        QueuesOverviewComponent
    ]
  }) 
  export class BranchesModule { }