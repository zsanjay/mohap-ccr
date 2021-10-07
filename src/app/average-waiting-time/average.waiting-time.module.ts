import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "../shared/shared.module";
import { AverageWaitingTimeRoutingModule } from "./average-waiting-time-routing.module";
import { AvgWaitingTimeMainComponent } from "./avg-waiting-time-main/avg-waiting-time-main.component";
import { AvgWaitingTimeQueuesComponent } from "./avg-waiting-time-queues/avg-waiting-time-queues.component";


@NgModule({
    imports: [
        AverageWaitingTimeRoutingModule,
        SharedModule,
        RouterModule,
        CommonModule,
        TranslateModule
    ],
    declarations: [
        AvgWaitingTimeMainComponent,
        AvgWaitingTimeQueuesComponent
    ]
  }) 
  export class AverageWaitingTimeModule { }