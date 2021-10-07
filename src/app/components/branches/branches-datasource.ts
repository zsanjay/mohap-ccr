import { DataSource } from '@angular/cdk/collections';
import { MatSort, Sort } from '@angular/material/sort';
import { Observable, of as observableOf, BehaviorSubject, combineLatest } from 'rxjs';
import { Branch } from 'src/app/models/branch.model';
import { DataProvider } from 'src/app/data-provider';

export interface BranchesItem {
  name: string;
  served: number;
  waiting : number;
  wtTime : string;
  trtTime : string;
}


/**
 * Data source for the Branches view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class BranchesDataSource extends DataSource<Branch> {
  private data = new BehaviorSubject<Branch[]>([]);
  sort!: MatSort;

  sortedData : Branch[];

  constructor(private dataProvider : DataProvider) {
    super();
  }

  loadData() {

   this.dataProvider.dashboardDataNew.subscribe(res => {
      this.data.next(res.branchData);
    });
    //let accounts = this.dataProvider.getBranchAccessData();

    // combineLatest(branches , accounts).subscribe((res: any) => {
    //  let regions = res[0];
    //  let accounts = res[1];

    //  if(accounts.branchIds.length !== 0){
    //     regions.branchData.filter((branch : any) => {
    //        return accounts.branchIds.includes(branch.id);
    //     })
    //   }

    //   this.data.next(regions.branchData);
    // });
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Branch[]> {
    return this.data;
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}
  

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
        case 'served': return compare(a.served, b.served, isAsc);
        case 'waiting': return compare(a.waiting, b.waiting, isAsc);
        case 'wtTime': return compare(a.wtTime, b.wtTime, isAsc);
        case 'trtTime': return compare(a.trtTime, b.trtTime, isAsc);
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
