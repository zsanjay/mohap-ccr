import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { AverageWaitingTimeComponent } from './components/average-waiting-time/average-waiting-time.component';
import { AverageTransactionTimeComponent } from './components/average-transaction-time/average-transaction-time.component';
import { BranchesComponent } from './components/branches/branches.component';
import { ServedAndWaitingPerDepartmentComponent } from './components/served-and-waiting-per-department/served-and-waiting-per-department.component';
import { CounterStatusComponent } from './components/counter-status/counter-status.component';
import { CustomerStatusComponent } from './components/customer-status/customer-status.component';
import { HappinessMeterComponent } from './components/happiness-meter/happiness-meter.component';
import { DashComponent } from './dash/dash.component';
import { CardComponent } from './card/card.component';
import { DashRightComponent } from './dash-right/dash-right.component';
import { FloatingButtonComponent } from './components/floating-button/floating-button.component';
import {TranslateModule , TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient , HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataProvider } from './data-provider';
import { PeakHoursComponent } from './components/peak-hours/peak-hours.component';
import { FilterComponent } from './filter/filter.component';
import { BranchFilterComponent } from './components/branch-filter/branch-filter.component';
import { TicketStatusFilterComponent } from './components/ticket-status-filter/ticket-status-filter.component';
import { EmiratesLabelComponent } from './components/emirates-label/emirates-label.component';
import { QueueOverviewFilterComponent } from './components/queue-overview-filter/queue-overview-filter.component';
import { ServedAndWaitingDeptFilterComponent } from './components/served-and-waiting-dept-filter/served-and-waiting-dept-filter.component';
import { CounterStatusFilterComponent } from './components/counter-status-filter/counter-status-filter.component';
import { CounterStatusHospitalFilterComponent } from './components/counter-status-hospital-filter/counter-status-hospital-filter.component';
import { ServedAndWaitingDepartmentsBootstapComponent } from './components/served-and-waiting-departments-bootstap/served-and-waiting-departments-bootstap.component';
import { CounterStatusLiveFilterComponent } from './components/counter-status-live-filter/counter-status-live-filter.component';
import { TicketStatusHospitalFilterComponent } from './components/ticket-status-hospital-filter/ticket-status-hospital-filter.component';
import { PeakHoursReportFilterComponent } from './components/peak-hours-report-filter/peak-hours-report-filter.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpCacheService } from './services/cache.service';
import { CacheInterceptor } from './interceptors/cache-interceptor';
import { SharedModule } from './shared/shared.module';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http , './assets/i18n/', '.json');
}

export function dataProviderFactory(provider: DataProvider) {
  return () => provider.load();
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AverageWaitingTimeComponent,
    AverageTransactionTimeComponent,
    BranchesComponent,
    ServedAndWaitingPerDepartmentComponent,
    CounterStatusComponent,
    CustomerStatusComponent,
    HappinessMeterComponent,
    DashComponent,
    CardComponent,
    DashRightComponent,
    FloatingButtonComponent,
    PeakHoursComponent,
    FilterComponent,
    BranchFilterComponent,
    TicketStatusFilterComponent,
    EmiratesLabelComponent,
    QueueOverviewFilterComponent,
    ServedAndWaitingDeptFilterComponent,
    CounterStatusFilterComponent,
    CounterStatusHospitalFilterComponent,
    ServedAndWaitingDepartmentsBootstapComponent,
    CounterStatusLiveFilterComponent,
    TicketStatusHospitalFilterComponent,
    PeakHoursReportFilterComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    BrowserModule,
    NoopAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    DataProvider,
    HttpCacheService,
   { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
   { provide: APP_INITIALIZER, useFactory: dataProviderFactory, deps: [DataProvider], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
