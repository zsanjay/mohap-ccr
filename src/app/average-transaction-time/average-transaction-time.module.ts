import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { BranchTitleColor } from "../branch-title-color";
import { SharedModule } from "../shared/shared.module";
import { AverageTransactionTimeBranchComponent } from "./average-transaction-time-branch/average-transaction-time-branch.component";
import { AverageTransactionTimeQueuesComponent } from "./average-transaction-time-queues/average-transaction-time-queues.component";
import { AverageTransactionTimeRoutingModule } from "./average-transaction-time-routing.module";
import { AverageTransactionTimeComponent } from "./average-transaction-time/average-transaction-time.component";

@NgModule({
    imports: [
        AverageTransactionTimeRoutingModule,
        SharedModule,
        RouterModule,
        CommonModule,
        TranslateModule
    ],
    declarations: [
        AverageTransactionTimeComponent,
        AverageTransactionTimeBranchComponent,
        AverageTransactionTimeQueuesComponent
    ]
  }) 
  export class AverageTransactionTimeModule { }