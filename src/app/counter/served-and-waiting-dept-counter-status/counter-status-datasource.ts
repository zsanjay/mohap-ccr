import { DataSource } from '@angular/cdk/collections';
import { MatSort, Sort } from '@angular/material/sort';
import { Observable, BehaviorSubject } from 'rxjs';
import { DataProvider } from 'src/app/data-provider';
import { CounterStatus } from 'src/app/models/counterstatus.model';

/**
 * Data source for the AvgWaitingTime view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CounterStatusDataSource extends DataSource<CounterStatus> {

  private data = new BehaviorSubject<CounterStatus[]>([]);

  sort!: MatSort;

  sortedData : CounterStatus[];

  constructor(private dataProvider : DataProvider) {
    super();
  }

  loadData(branchId : number) {

  this.dataProvider.getAllServicePointsByBranchId(branchId)
  .subscribe(res => this.data.next(res));
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<CounterStatus[]> {
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
        case 'status': return compare(a.status, b.status, isAsc);
        case 'staffName': return compare(a.staffFullName, b.staffFullName, isAsc);
        case 'served': return compare(a.served, b.served, isAsc);
        case 'totalTrTime': return compare(a.transactionTime, b.transactionTime, isAsc);
        default: return 0;
      }
    });

    this.data.next(this.sortedData);
  }


  filterByBranch(branchId : number): any {

  this.dataProvider.getAllServicePointsByBranchId(branchId)
  .subscribe(res => this.data.next(res));
}

}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}






