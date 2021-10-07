import { DataSource } from '@angular/cdk/collections';
import { MatSort, Sort } from '@angular/material/sort';
import { Observable, BehaviorSubject } from 'rxjs';
import { DataProvider } from 'src/app/data-provider';
import { AvgWaitingTimeBranch } from 'src/app/models/avgWaitingTimeBranch.model';
import { UtilityService } from 'src/app/services/utility.service';


/**
 * Data source for the AvgWaitingTime view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class QueueOverviewDataSource extends DataSource<AvgWaitingTimeBranch> {

  private data = new BehaviorSubject<AvgWaitingTimeBranch[]>([]);

  sort!: MatSort;

  sortedData : AvgWaitingTimeBranch[];
  pdfData : AvgWaitingTimeBranch[];

  constructor(private dataProvider : DataProvider , private utilityService : UtilityService) {
    super();
  }

  loadData(branchId : number) {

  this.dataProvider.getQueueOverviewDataByBranchId(branchId)
  .subscribe(res => {
      this.data.next(res);
      let tempArray : any[] = [];

      res.forEach((data : any)=> {
      let temp = Object.assign({} , data);
     
      let avgTime = this.utilityService.getAverageTime(temp.avgTrtTime);
      let avgWtTime = this.utilityService.getAverageTime(temp.avgWtTime);
      temp.avgTrtTime = avgTime;
      temp.avgWtTime = avgWtTime;

      tempArray.push(temp);
      });
  
      this.pdfData = tempArray;

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
        case 'avgTrtTime': return compare(a.avgTrtTime, b.avgTrtTime, isAsc);
        case 'avgWtTime': return compare(a.avgWtTime, b.avgWtTime, isAsc);
        case 'served': return compare(a.served, b.served, isAsc);
        case 'waiting': return compare(a.waiting, b.waiting, isAsc);
        case 'open': return compare(a.open, b.open, isAsc);
        default: return 0;
      }
    });

    this.data.next(this.sortedData);
  }


  filterByBranch(branchId : number): any {

  this.dataProvider.getQueueOverviewDataByBranchId(branchId)
  .subscribe(res => {
    this.data.next(res);

    let tempArray : any[] = [];

    res.forEach((data : any)=> {
    let temp = Object.assign({} , data);
   
    let avgTime = this.utilityService.getAverageTime(temp.avgTrtTime);
    let avgWtTime = this.utilityService.getAverageTime(temp.avgWtTime);
    temp.avgTrtTime = avgTime;
    temp.avgWtTime = avgWtTime;

    tempArray.push(temp);
    });

    this.pdfData = tempArray;
  });
}

}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}






