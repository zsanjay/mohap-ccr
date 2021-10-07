import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "../shared/shared.module";
import { CounterStatusHospitalComponent } from "./counter-status-hospital/counter-status-hospital.component";
import { CounterStatusLiveComponent } from "./counter-status-live/counter-status-live.component";
import { CounterStatusRoutingModule } from "./counter-status-routing.module";
import { ServedAndWaitingDeptCounterStatusComponent } from "./served-and-waiting-dept-counter-status/served-and-waiting-dept-counter-status.component";

@NgModule({
    imports: [
        CounterStatusRoutingModule,
        SharedModule,
        RouterModule,
        CommonModule,
        TranslateModule
    ],
    declarations: [
        CounterStatusHospitalComponent,
        CounterStatusLiveComponent,
        ServedAndWaitingDeptCounterStatusComponent
    ]
  }) 
  export class CounterStatusModule { }