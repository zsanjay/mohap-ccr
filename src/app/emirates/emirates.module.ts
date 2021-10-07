import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "../shared/shared.module";
import { EmiratesBranchesComponent } from "./emirates-branches/emirates-branches.component";
import { EmiratesRoutingModule } from "./emirates-routing.module";
import { EmiratesComponent } from "./emirates/emirates.component";


@NgModule({
    imports: [
        EmiratesRoutingModule,
        SharedModule,
        RouterModule,
        CommonModule,
        TranslateModule
    ],
    declarations: [
        EmiratesComponent,
        EmiratesBranchesComponent
    ]
  }) 
  export class EmiratesModule { }