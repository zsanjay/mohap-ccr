import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "../shared/shared.module";
import { TicketStatusHospitalComponent } from "./ticket-status-hospital/ticket-status-hospital.component";
import { TicketStatusRoutingModule } from "./ticket-status-routing.module";
import { TicketStatusComponent } from "./ticket-status/ticket-status.component";


@NgModule({
    imports: [
        TicketStatusRoutingModule,
        SharedModule,
        RouterModule,
        CommonModule,
        TranslateModule
    ],
    declarations: [
        TicketStatusComponent,
        TicketStatusHospitalComponent
    ]
  }) 
  export class TicketStatusModule { }