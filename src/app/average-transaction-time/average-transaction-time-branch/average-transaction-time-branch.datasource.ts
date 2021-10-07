import { DataSource } from '@angular/cdk/collections';
import { MatSort, Sort } from '@angular/material/sort';
import { Observable, BehaviorSubject } from 'rxjs';
import { DataProvider } from 'src/app/data-provider';
import { AvgWaitingTimeBranch } from 'src/app/models/avgWaitingTimeBranch.model';
import { FilterCriteria } from 'src/app/models/filterCriteria.model';
import { FilterService } from 'src/app/services/filter.service';
import { UtilityService } from 'src/app/services/utility.service';


/**
 * Data source for the AvgWaitingTime view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AvgTransactionTimeDataSource extends DataSource<AvgWaitingTimeBranch> {

  private data = new BehaviorSubject<AvgWaitingTimeBranch[]>([]);

  sort!: MatSort;

  sortedData : AvgWaitingTimeBranch[];
  pdfData : AvgWaitingTimeBranch[];

  constructor(private dataProvider : DataProvider , private filterService : FilterService , private utilityService : UtilityService) {
    super();
  }

  loadData(value : string) {

  this.dataProvider.getAvgTransactionTimeData(value)
  .subscribe(res => {
    this.data.next(res);

    let tempArray : any[] = [];
    res.forEach((data : any)=> {
    let temp = Object.assign({} , data);
    let avgTime = this.utilityService.getAverageTime(temp.avgTrtTime);
    temp.avgTrtTime = avgTime;
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
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    // const dataMutations = [
    //   observableOf(this.dataProvider.getAllBranchData()),
    //   this.sort.sortChange
    // ];

    // return merge(...dataMutations).pipe(map(() => {
    //   return this.getSortedData([...this.dataProvider.getAllBranchData()]);
    // }));
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
        case 'avgTrtTime':
          if(isAsc){
            this.filterService.changeHLFilter("0");
          }
          else{
            this.filterService.changeHLFilter("1");
          }
        return compare(a.avgTrtTime, b.avgTrtTime, isAsc);
        case 'open': return compare(a.open, b.open, isAsc);
        case 'closed': return compare(a.closed, b.closed, isAsc);
        default: return 0;
      }
    });

    this.data.next(this.sortedData);
  }


  filterWithCriteria(filtercriteria : FilterCriteria): any {

  this.dataProvider.findAvgTransactionTimeDataByBranchIds(filtercriteria)
  .subscribe(res => {
    this.data.next(res);

    let tempArray : any[] = [];
    res.forEach((data : any)=> {
    let temp = Object.assign({} , data);
    let avgTime = this.utilityService.getAverageTime(temp.avgTrtTime);
    temp.avgTrtTime = avgTime;
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






