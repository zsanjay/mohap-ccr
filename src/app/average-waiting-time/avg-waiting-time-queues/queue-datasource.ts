import { DataSource } from '@angular/cdk/collections';
import { MatSort, Sort } from '@angular/material/sort';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, of as observableOf, BehaviorSubject, of } from 'rxjs';
import { DataProvider } from 'src/app/data-provider';
import { AvgWaitingTimeBranch } from 'src/app/models/avgWaitingTimeBranch.model';
import { FilterService } from 'src/app/services/filter.service';
import { BranchFilterCriteria } from 'src/app/models/branchFilterCriteria.model';


/**
 * Data source for the AvgWaitingTime view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class QueueDataSource extends DataSource<AvgWaitingTimeBranch> {

  private data = new BehaviorSubject<AvgWaitingTimeBranch[]>([]);
  
  private loadingData = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingData.asObservable();
  sort!: MatSort;

  sortedData : AvgWaitingTimeBranch[];
  pdfData : AvgWaitingTimeBranch[];
  

  constructor(private dataProvider : DataProvider , private filterService : FilterService) {
    super();
  }

  loadData(value : string , branchId : number) {
    
  this.loadingData.next(true);

  this.dataProvider.getQueuesByBranchId(value , branchId).pipe(
    catchError(() => of([])),
    finalize(() => this.loadingData.next(false))
  )
  .subscribe(res => {
    
    let avgWaitingTimeBranches : AvgWaitingTimeBranch[] = [];

    res.forEach((data : AvgWaitingTimeBranch)=> {
      
      if(data.avgWtTime > 0)
      avgWaitingTimeBranches.push(data);

    });

    res.forEach((data : AvgWaitingTimeBranch)=> {
      
      if(data.avgWtTime == 0)
      avgWaitingTimeBranches.push(data);
      
    });

    this.pdfData = avgWaitingTimeBranches;
    this.data.next(avgWaitingTimeBranches);

  });
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<AvgWaitingTimeBranch[]> {
    return this.data.asObservable();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    this.data.complete();
    this.loadingData.complete();
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
        case 'avgWtTime':
          if(isAsc){
            this.filterService.changeHLFilterBranches("0");
          }
          else{
            this.filterService.changeHLFilterBranches("1");
          }
        return ( (a.avgWtTime > 0 && b.avgWtTime > 0  && a.avgWtTime < b.avgWtTime) ? -1 : 1) * (isAsc ? 1 : -1);
       // return compare(a.avgWtTime , b.avgWtTime , isAsc);
        case 'waiting' : return compare(a.waiting , b.waiting , isAsc);
        case 'open': return compare(a.open, b.open, isAsc);
        default: return 0;
      }
    });

    this.data.next(this.sortedData);
  }


  filterWithCriteria(filtercriteria : BranchFilterCriteria): any {
  this.loadingData.next(true);

  this.dataProvider.getQueuesByBranchId(filtercriteria.sort , filtercriteria.branchId).pipe(
    catchError(() => of([])),
    finalize(() => this.loadingData.next(false))
  )
  .subscribe(res => {
    
    let avgWaitingTimeBranches : AvgWaitingTimeBranch[] = [];

    res.forEach((data : AvgWaitingTimeBranch)=> {
      
      if(data.avgWtTime > 0)
      avgWaitingTimeBranches.push(data);

    });

    res.forEach((data : AvgWaitingTimeBranch)=> {
      
      if(data.avgWtTime == 0)
      avgWaitingTimeBranches.push(data);
      
    });

    this.pdfData = avgWaitingTimeBranches;
    this.data.next(avgWaitingTimeBranches);

  });
}

}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}






