import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchFilterComponent } from './components/branch-filter/branch-filter.component';
import { CounterStatusFilterComponent } from './components/counter-status-filter/counter-status-filter.component';
import { CounterStatusHospitalFilterComponent } from './components/counter-status-hospital-filter/counter-status-hospital-filter.component';
import { CounterStatusLiveFilterComponent } from './components/counter-status-live-filter/counter-status-live-filter.component';
import { EmiratesLabelComponent } from './components/emirates-label/emirates-label.component';
import { PeakHoursReportFilterComponent } from './components/peak-hours-report-filter/peak-hours-report-filter.component';
import { QueueOverviewFilterComponent } from './components/queue-overview-filter/queue-overview-filter.component';
import { ServedAndWaitingDeptFilterComponent } from './components/served-and-waiting-dept-filter/served-and-waiting-dept-filter.component';
import { TicketStatusFilterComponent } from './components/ticket-status-filter/ticket-status-filter.component';
import { TicketStatusHospitalFilterComponent } from './components/ticket-status-hospital-filter/ticket-status-hospital-filter.component';
import { DashRightComponent } from './dash-right/dash-right.component';
import { DashComponent } from './dash/dash.component';
import { FilterComponent } from './filter/filter.component';


const routes: Routes = [
  { path: '', pathMatch : "full" , redirectTo : 'dashboard' },
  { path: 'dashboard', component: DashComponent },
  { path: '', component: DashRightComponent  , outlet: 'secondRouter'},
  { path: 'avg-transaction-time', loadChildren: () => import('./average-transaction-time/average-transaction-time.module').then(m => m.AverageTransactionTimeModule)},
  { path: 'avg-waiting-time', loadChildren: () => import('./average-waiting-time/average.waiting-time.module').then(m => m.AverageWaitingTimeModule)},
  { path: 'filter/:showSort', component: FilterComponent, outlet: 'secondRouter'},
  { path: 'filter/:showSort/:regionId', component: FilterComponent, outlet: 'secondRouter'},
  { path: 'branch-filter/:selectedbranchId', component: BranchFilterComponent, outlet: 'secondRouter'},
  { path: 'branch-filter/:selectedbranchId/:branchIds', component: BranchFilterComponent, outlet: 'secondRouter'},
  { path: 'branch-filter/:selectedbranchId/:branchIds/:sort', component: BranchFilterComponent, outlet: 'secondRouter'},
  { path: 'ticket-status-filter/:tab', component: TicketStatusFilterComponent , outlet: 'secondRouter'},
  { path: 'ticket-status-filter/:selectedbranchId/:queueId/:branchIds/:tab', component: TicketStatusFilterComponent , outlet: 'secondRouter'},
  { path: 'emirates', loadChildren: () => import('./emirates/emirates.module').then(m => m.EmiratesModule) },
  { path: 'ticket-status',  loadChildren: () => import('./ticket-status-components/ticket-status.module').then(m => m.TicketStatusModule)},
  { path : 'emirates-label' , component : EmiratesLabelComponent , outlet : 'secondRouter' },
  { path: 'branches', loadChildren: () => import('./branches/branches-module').then(m => m.BranchesModule)},
  { path: 'served-and-waiting-dept',  loadChildren: () => import('./served-and-waiting-departments/served-and-waiting-departments.module').then(m => m.ServedAndWaitingDepartmentsModule)},
  { path: 'queues-filter/:branchId/:branchIds', component: QueueOverviewFilterComponent , outlet: 'secondRouter'},
  { path : 'served-and-waiting-dept-filter' , component : ServedAndWaitingDeptFilterComponent , outlet: 'secondRouter'},
  { path : 'ticket-status-hospital-filter-dept/:branchId/:branchIds' , component : TicketStatusHospitalFilterComponent , outlet: 'secondRouter'},
  { path: 'counter-status-filter/:branchId/:showLive/:branchIds', component: CounterStatusFilterComponent , outlet: 'secondRouter'},
  { path: 'counter-status', loadChildren: () => import('./counter/counter-status.module').then(m => m.CounterStatusModule) },
  { path: 'counter-status-hospital-filter', component: CounterStatusHospitalFilterComponent , outlet: 'secondRouter'},
  { path: 'counter-status-live-filter/:branchId/:branchIds', component: CounterStatusLiveFilterComponent , outlet: 'secondRouter'},
  { path: 'ticket-status-hospital-filter', component: CounterStatusHospitalFilterComponent , outlet: 'secondRouter'},
  { path: 'peak-data-hours', loadChildren: () => import('./peak-hours/peak-hours.module').then(m => m.PeakHoursModule)},
  { path: 'peak-data-hours-filter', component: PeakHoursReportFilterComponent , outlet: 'secondRouter'},
  { path: 'ticket-status-hospital-filter', component: CounterStatusHospitalFilterComponent , outlet: 'secondRouter'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes , { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
