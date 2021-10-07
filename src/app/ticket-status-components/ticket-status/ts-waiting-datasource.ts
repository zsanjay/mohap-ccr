import { DataSource } from "@angular/cdk/collections";
import { MatSort, Sort } from "@angular/material/sort";
import { BehaviorSubject, Observable } from "rxjs";
import { DataProvider } from "src/app/data-provider";
import { Waiting } from "src/app/models/waiting.model";
import { TicketStatusComponent } from "./ticket-status.component";

export class TSWaitingDataSource extends DataSource<Waiting> {

    private data = new BehaviorSubject<Waiting[]>([]);
    sort!: MatSort;
    deptName : string;
    sortedData : Waiting[];
  
    constructor(private dataProvider : DataProvider , private ticketStatusComponent : TicketStatusComponent) {
      super();
    }
  
    loadData(branchId : number , deptId : number , deptName : string) {
    this.dataProvider.getTSWaitingData(branchId , deptId)
    .subscribe(res => { 
     this.ticketStatusComponent.setQueueName(deptName);
      this.data.next(res);
    });
    }
  
    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<Waiting[]> {
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
          case 'ticket': return compare(a.ticketId, b.ticketId, isAsc);
          case 'totalWtTime' : return compare(a.totalWaitingTime , b.totalWaitingTime , isAsc);
          case 'wtTime': return compare(a.waitingTime, b.waitingTime, isAsc);
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
  