import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "../shared/shared.module";
import { DeptChartComponent } from "./dept-chart/dept-chart.component";
import { ServedAndWaitingDepartmentsRoutingModule } from "./served-and-waiting-departments-routing.module";
import { ServedAndWaitingDepartmentsComponent } from "./served-and-waiting-departments/served-and-waiting-departments.component";

@NgModule({
    imports: [
        ServedAndWaitingDepartmentsRoutingModule,
        SharedModule,
        RouterModule,
        CommonModule,
        TranslateModule
    ],
    declarations: [
        ServedAndWaitingDepartmentsComponent,
        DeptChartComponent
    ]
  }) 
  export class ServedAndWaitingDepartmentsModule { }