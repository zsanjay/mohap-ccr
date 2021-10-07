import { DataSource } from '@angular/cdk/collections';
import { MatSort, Sort } from '@angular/material/sort';
import { Observable, BehaviorSubject } from 'rxjs';
import { DataProvider } from 'src/app/data-provider';
import { CounterStatusHospital } from 'src/app/models/counter-status-hospital.model';
 
/**
 * Data source for the AvgWaitingTime view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CounterStatusHospitalDataSource extends DataSource<CounterStatusHospital> {

  private data = new BehaviorSubject<CounterStatusHospital[]>([]);

  sort!: MatSort;

  sortedData : CounterStatusHospital[];
  pdfData : CounterStatusHospital[];

  constructor(private dataProvider : DataProvider) {
    super();
  }

  loadData(branchIds : number[]) {

  this.dataProvider.getCounterStatusHospitalData(branchIds)
  .subscribe(res => {

   let counterStatusHospital : CounterStatusHospital[] = [];

      res.forEach( data => {

        counterStatusHospital.push({
            id : data.id,
            name : data.name,
            total : data.open + data.closed,
            open : data.open,
            closed : data.closed
        });   
      })
      this.pdfData = counterStatusHospital;
    this.data.next(counterStatusHospital);
});
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<CounterStatusHospital[]> {
    return this.data.asObservable();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    this.data.complete();
  }
  

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  
   getSortedData(sort : Sort) {
    
   this.sortedData = this.data.getValue();

    this.sortedData.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'total': return compare(a.total, b.total, isAsc);
        case 'open': return compare(a.open, b.open, isAsc);
        case 'closed': return compare(a.closed, b.closed, isAsc);
        default: return 0;
      }
    });

    this.data.next(this.sortedData);
  }

}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}






