import { LayoutModule } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { MatTableExporterModule } from "mat-table-exporter";
import { ChartsModule } from "ng2-charts";
import { TooltipModule } from "ng2-tooltip-directive";
import { AppRoutingModule } from "../app-routing.module";
import { HttpLoaderFactory } from "../app.module";
import { BranchTitleColor } from "../branch-title-color";
import { ProgressBarColor } from "../progress-bar-color";

@NgModule({
    imports: [
        ChartsModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatTableModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTabsModule,
        MatInputModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressBarModule,
        FlexLayoutModule,
        FormsModule,
        MatSlideToggleModule,
        NgbModule,
        MatRadioModule,
        MatSelectModule,
        MatTableExporterModule,
        TooltipModule
    ],
    exports : [
        ChartsModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatTableModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTabsModule,
        MatInputModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressBarModule,
        FlexLayoutModule,
        FormsModule,
        MatSlideToggleModule,
        NgbModule,
        MatRadioModule,
        MatSelectModule,
        MatTableExporterModule,
        TooltipModule,
        BranchTitleColor,
        ProgressBarColor
    ],
    declarations: [
        BranchTitleColor,
        ProgressBarColor
    ]
  }) 
  export class SharedModule { }