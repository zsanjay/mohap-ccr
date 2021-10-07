import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Observable, of as observableOf, BehaviorSubject } from 'rxjs';
import { DataProvider } from 'src/app/data-provider';
import { ServedWaitingDepartment } from 'src/app/models/servedandwaitingdept.model';
import { ServedWaitingDepartmentData } from 'src/app/models/servedandwaitingdeptdata.model';
import { EmiratesService } from 'src/app/services/emirates.service';


/**
 * Data source for the Branches view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ServedAndWaitingDeptDataSource extends DataSource<ServedWaitingDepartment> { 
  public data = new BehaviorSubject<any>({});
  sort!: MatSort;
  paginator : MatPaginator;
  servedWaitingDepartments : ServedWaitingDepartment[];

  sortedData : ServedWaitingDepartment[];

  constructor(private dataProvider : DataProvider , private emiratesService : EmiratesService){
    super();
  }

  loadDataAllBranchesData(branchIds : number[] , page: number , limit : number) {

  this.dataProvider.getAllServedAndWaitingDept(branchIds , page + 1 , limit)
      .subscribe((data : any) => {

        data.hoursDataList.forEach((element : any) => {
          let hours = new Array<ServedWaitingDepartmentData>();
          
          for(var i = 0; i < 23; i++){
            hours.push({ 
              hours : 0,
              hour_24 : 0,
              served : 0,
              noShows : 0,
              others : 0
            });
          }
          
            element.data.forEach((d : any) => {
              // hours.splice( d.hours - 1 , 0 , d);
              hours[d.hour_24 - 1] = d;
            });
            
            element.data = hours;
  
        });
        this.data.next({totalCount : data.totalResult , data : data.hoursDataList});
      });
      

 }

  loadData(branchId : string , page: number , limit : number) {

     this.dataProvider.getServedAndWaitingDeptbyBranchId(branchId , page + 1 , limit)
     .subscribe((res : any) => { 
      res.hoursDataList.forEach((element : any) => {

        let hours = new Array<ServedWaitingDepartmentData>();
        
        for(var i = 0; i < 23; i++){
          hours.push({ 
            hours : 0,
            hour_24 : 0,
            served : 0,
            noShows : 0,
            others : 0
          });
        }

          element.data.forEach((d : any) => {
            // hours.splice( d.hours - 1 , 0 , d);
            hours[d.hour_24 - 1] = d;
          });
          
          element.data = hours;

      });
      this.data.next({totalCount : res.totalResult , data : res.hoursDataList});
    });
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ServedWaitingDepartment[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    // const dataMutations = [
    //   observableOf(this.dataProvider.dashboardData),
    //   this.sort.sortChange
    // ];

    // return merge(...dataMutations).pipe(map(() => {
    //   return this.getSortedData([...this.dataProvider.getBranchesData()]);
    // }));
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

    // this.sortedData.sort((a, b) => {
    //   const isAsc = this.sort.direction === 'asc';
    //   switch (this.sort.active) {
    //     case 'name': return compare(a.name, b.name, isAsc);
    //     case 'served': return compare(a.served, b.served, isAsc);
    //     case 'waiting': return compare(a.waiting, b.waiting, isAsc);
    //     case 'wtTime': return compare(a.wtTime, b.wtTime, isAsc);
    //     case 'trtTime': return compare(a.trtTime, b.trtTime, isAsc);
    //     default: return 0;
    //   }
    // });

   this.data.next(this.sortedData);
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
