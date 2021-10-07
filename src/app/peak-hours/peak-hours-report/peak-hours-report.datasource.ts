import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, of as observableOf, BehaviorSubject } from 'rxjs';
import { DataProvider } from 'src/app/data-provider';
import { PeakHoursReport } from 'src/app/models/peak-hours-report.model';
import { PeakHours } from 'src/app/models/peak-hours.model';
import { PeakHoursReportComponent } from './peak-hours-report.component';

/**
 * Data source for the Branches view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class PeakHoursReportDataSource extends DataSource<PeakHoursReport> { 
  public data = new BehaviorSubject<any>({});
  sort!: MatSort;
  paginator : MatPaginator;
  peakHoursReportData : PeakHoursReport[];

  constructor(private dataProvider : DataProvider , private peakHoursReportComponent : PeakHoursReportComponent){
    super();
  }

  loadData(branchIds : number[] , startDate : string , endDate : string) {

    this.dataProvider.getHeapData(branchIds , startDate , endDate).subscribe((res : any) => {
  
        let heapData = res.heapData;

        heapData.forEach((element : any) => {
          let hours = new Array<PeakHours>();
          
          for(var i = 0; i < 23; i++){
            hours.push({ 
              hours : 0,
              hour_24 : 0,
              served : 0
            });
          }
          
            element.data.forEach((d : any) => {
              hours[d.hour_24 - 1] = d;
            });
            
            element.data = hours;
        });

        this.peakHoursReportData = heapData;
        this.data.next(heapData);
        this.peakHoursReportComponent.setTimeAndServed(res.heapDate);

    });
    
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<PeakHoursReport[]> {
    
    return this.data;
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

}

