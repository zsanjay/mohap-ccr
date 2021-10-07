import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { DateSuffix } from "../pipes/dateSuffix.pipe";
import { SharedModule } from "../shared/shared.module";
import { PeakHourCardComponent } from "./peak-hour-card/peak-hour-card.component";
import { PeakHoursReportComponent } from "./peak-hours-report/peak-hours-report.component";
import { PeekHoursRoutingModule } from "./peak-hours-routing.module";


@NgModule({
    imports: [
        PeekHoursRoutingModule,
        SharedModule,
        RouterModule,
        CommonModule,
        TranslateModule
    ],
    declarations: [
        PeakHoursReportComponent,
        PeakHourCardComponent,
        DateSuffix
    ]
  }) 
  export class PeakHoursModule { }