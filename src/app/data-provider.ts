import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, timer } from "rxjs";
import { map, shareReplay, switchMap } from "rxjs/operators";
import { APIResponse } from "./models/apiresponse.model";
import { AverageWaiting } from "./models/averagewaiting.model";
import { AvgWaitingTimeBranch } from "./models/avgWaitingTimeBranch.model";
import { CounterStatusLive } from "./models/counter-status-live.model";
import { Counter } from "./models/counter.model";
import { CounterStatus } from "./models/counterstatus.model";
import { Customer } from "./models/customer.model";
import { FilterCriteria } from "./models/filterCriteria.model";
import { Happiness } from "./models/happiness.model";
import { Queue } from "./models/queue.model";
import { TSOther } from "./models/ts-other-model";
import { TSServed } from "./models/ts-served.model";
import { Waiting } from "./models/waiting.model";

const CACHE_SIZE = 1;
const REFRESH_INTERVAL = 60000;
const headers = new HttpHeaders({ 'cache-response': 'true' });

@Injectable()
export class DataProvider {

    private baseUrl = 'http://mh-in-qappsrv.moh.ae:8080/mohap-ccr-api-0.0.1/api/allData';
    private branchDataUrl = 'http://mh-in-qappsrv.moh.ae:8080/mohap-ccr-api-0.0.1/api/branchData';
    private regionsURL = 'http://mh-in-qappsrv.moh.ae:8080/qsystem/rest/config/branchGroups';
    private branchesURL = "http://mh-in-qappsrv.moh.ae:8080/qsystem/rest/entrypoint/branches";
    private ticketStatusWaitingURL = 'http://mh-in-qappsrv.moh.ae:8080/mohap-ccr-api-0.0.1/api/waitingTickets';
    private ticketStatusServedURL = 'http://mh-in-qappsrv.moh.ae:8080/mohap-ccr-api-0.0.1/api/servedTickets';
    private ticketStatusOtherURL = 'http://mh-in-qappsrv.moh.ae:8080/mohap-ccr-api-0.0.1/api/otherTickets';
    private emiratesURL = 'http://mh-in-qappsrv.moh.ae:8080/mohap-ccr-api-0.0.1/api/ServedWaitingNoShow';
    private departmentsURL = 'http://mh-in-qappsrv.moh.ae:8080/mohap-ccr-api-0.0.1/api/ServedWaitingNoShowPage';
    private servicePointsURL = 'http://mh-in-qappsrv.moh.ae:8080/mohap-ccr-api-0.0.1/api/servicePoints';
    private queueDataURL = "http://mh-in-qappsrv.moh.ae:8080/mohap-ccr-api-0.0.1/api/queuesData";
    private counterStatusLive = "http://mh-in-qappsrv.moh.ae:8080/mohap-ccr-api-0.0.1/api/servicePointsLive";
    private heapDataURL = "http://mh-in-qappsrv.moh.ae:8080/mohap-ccr-api-0.0.1/api/heapDataWithDate";
    private branchAccessURL = "http://mh-in-qappsrv.moh.ae:8080/qsystem/rest/entrypoint/account"; 

    public data = new BehaviorSubject<APIResponse>({
        avgWatData: {} as AverageWaiting,
        avgTrtData: {} as AverageWaiting,
        servedData: [],
        branchData: [],
        servedWaiting: [],
        counterData: {} as Counter,
        customerData: {} as Customer,
        happinessData: {} as Happiness,
        peakHours: []
    });

    dashboardData : Observable<APIResponse>;
    userActivity : any;
    userInactive: Subject<any> = new Subject();

    constructor(private http: HttpClient) {
        this.setTimeout();
    }

    load() {

//   this.getBranchAccessData().subscribe((account : any) => {

//         if(account.branchIds.length == 0){
                return this.http
                .get(this.baseUrl)
                .subscribe((response: any) => {
                    this.data.next(response);
                })
//         }

//             const requestBody = {
//                 branchIds : account.branchIds
//             }

//          return this.http.post(this.baseUrl , requestBody)
//          .subscribe((response: any) => {
//             this.data.next(response);
//         });

//    })
    } 

    setTimeout() {
        this.userActivity = setTimeout(() => this.userInactive.next(undefined), 3000);
      }


   get dashboardDataNew(){

        if (!this.dashboardData) {

      const timer$ = timer(0, REFRESH_INTERVAL);

      // For each tick make an http request to fetch new data
      this.dashboardData = timer$.pipe(
        switchMap(_ => {
             this.load();
             return this.data.asObservable();
        }),
        shareReplay(CACHE_SIZE)
      );
    }
      
        return this.dashboardData;
    }

    getBranchAccessData() {
        return this.http.get(this.branchAccessURL , {headers});
    }

    getEmiratesData() {
        return this.http.get(this.emiratesURL , {headers});
    }

    getAllBranchData(value: string): Observable<AvgWaitingTimeBranch[]> {

        if (value == "0") {
            return this.http.get(this.branchDataUrl).pipe(
                map((events: any) => events.sort((a: AvgWaitingTimeBranch, b: AvgWaitingTimeBranch) => a.avgWtTime - b.avgWtTime))
            );
        }
        else {
            return this.http.get(this.branchDataUrl).pipe(
                map((events: any) => events.sort((a: AvgWaitingTimeBranch, b: AvgWaitingTimeBranch) => b.avgWtTime - a.avgWtTime))
            );
        }

    }

    getAvgTransactionTimeData(value: string): Observable<AvgWaitingTimeBranch[]> {

        if (value == "0") {
            return this.http.get(this.branchDataUrl).pipe(
                map((events: any) => events.sort((a: AvgWaitingTimeBranch, b: AvgWaitingTimeBranch) => a.avgTrtTime - b.avgTrtTime))
            );
        }
        else {
            return this.http.get(this.branchDataUrl).pipe(
                map((events: any) => events.sort((a: AvgWaitingTimeBranch, b: AvgWaitingTimeBranch) => b.avgTrtTime - a.avgTrtTime))
            );
        }

    }

    findByBranchIds(filterCriteria: FilterCriteria) {

        if (filterCriteria.sort == "0") {
            return this.http.get(this.branchDataUrl).pipe(
                map((data: any) => data.filter((awt: AvgWaitingTimeBranch) => {
                    return filterCriteria.branchIds.includes(awt.id);
                })
                )
            ).pipe(
                map((events: any) => events.sort((a: AvgWaitingTimeBranch, b: AvgWaitingTimeBranch) => a.avgWtTime - b.avgWtTime))
            );
        }
        else {
            return this.http.get(this.branchDataUrl).pipe(
                map((data: any) => data.filter((awt: AvgWaitingTimeBranch) => {
                    return filterCriteria.branchIds.includes(awt.id);
                })
                )
            ).pipe(
                map((events: any) => events.sort((a: AvgWaitingTimeBranch, b: AvgWaitingTimeBranch) => b.avgWtTime - a.avgWtTime))
            );
        }

    }

    findAvgTransactionTimeDataByBranchIds(filterCriteria: FilterCriteria) {

        if (filterCriteria.sort == "0") {
            return this.http.get(this.branchDataUrl).pipe(
                map((data: any) => data.filter((awt: AvgWaitingTimeBranch) => {
                    return filterCriteria.branchIds.includes(awt.id);
                })
                )
            ).pipe(
                map((events: any) => events.sort((a: AvgWaitingTimeBranch, b: AvgWaitingTimeBranch) => a.avgTrtTime - b.avgTrtTime))
            );
        }
        else {
            return this.http.get(this.branchDataUrl).pipe(
                map((data: any) => data.filter((awt: AvgWaitingTimeBranch) => {
                    return filterCriteria.branchIds.includes(awt.id);
                })
                )
            ).pipe(
                map((events: any) => events.sort((a: AvgWaitingTimeBranch, b: AvgWaitingTimeBranch) => b.avgTrtTime - a.avgTrtTime))
            );
        }

    }

    getRegions(): Observable<any> {

        return this.http.get(this.regionsURL , {headers});

    }

    getBranches(): Observable<any> {

        return this.http.get(this.branchesURL , {headers});
    }

    getBranchesById(criteria: FilterCriteria) {

        return this.http.get(this.branchesURL , {headers}).pipe(
            map((data: any) => data.filter((branch: any) => {
                return criteria.branchIds.includes(branch.id);
            })
            )
        );
    }

    getBranchByBranchId(branchId : number){

        return this.http.get(this.branchesURL , {headers}).pipe(
            map((data: any) => data.filter((branch: any) => {
                return branchId == branch.id;
            })
            )
        );
    }

    getQueuesByBranchId(value: string, branchId: number) {

        if (value == "0") {
            return this.http.get(this.branchDataUrl + "/" + branchId , {
                params: {
                    showServicePoints : "true"
                  }
            }).pipe(
                map((events: any) => events.sort((a: AvgWaitingTimeBranch, b: AvgWaitingTimeBranch) => a.avgWtTime - b.avgWtTime))
            );
        }
        else {
            return this.http.get(this.branchDataUrl + "/" + branchId , {
                params: {
                    showServicePoints : "true"
                  }
            }).pipe(
                map((events: any) => events.sort((a: AvgWaitingTimeBranch, b: AvgWaitingTimeBranch) => b.avgWtTime - a.avgWtTime))
            );
        }
    }

    getTicketStatusWaitingQueuesByBranchId(branchId: number) {

        return this.http.get(this.queueDataURL + "/" + branchId).pipe(
            map((events: any) => events.sort((a: Queue, b: Queue) => b.waiting - a.waiting))
        );
       
    }

    getTicketStatusServedQueuesByBranchId(branchId: number) {

        return this.http.get(this.queueDataURL + "/" + branchId).pipe(
            map((events: any) => events.sort((a: Queue, b: Queue) => b.served - a.served))
        );
    }

    getTicketStatusOthersQueuesByBranchId(branchId: number) {

        return this.http.get(this.queueDataURL + "/" + branchId).pipe(
            map((events: any) => events.sort((a: Queue, b: Queue) => b.others - a.others))
        );
    }

    getTransQueuesByBranchId(value: string, branchId: number) {

        if (value == "0") {
            return this.http.get(this.branchDataUrl + "/" + branchId , {
                params: {
                    showServicePoints : "true"
                  }
            }).pipe(
                map((events: any) => events.sort((a: AvgWaitingTimeBranch, b: AvgWaitingTimeBranch) => a.avgTrtTime - b.avgTrtTime))
            );
        }
        else {
            return this.http.get(this.branchDataUrl + "/" + branchId , {
                params: {
                    showServicePoints : "true"
                  }
            }).pipe(
                map((events: any) => events.sort((a: AvgWaitingTimeBranch, b: AvgWaitingTimeBranch) => b.avgTrtTime - a.avgTrtTime))
            );
        }
    }

    getTSWaitingData(branchId: number, deptId: number) {

        return this.http.get(this.ticketStatusWaitingURL + "/" + branchId + "/" + deptId).pipe(
            map((events: any) => events.sort((a: Waiting, b: Waiting) => a.ticketId > b.ticketId ? 1 : -1))
        );
    }

    getTSServedData(branchId: number, deptId: number) {

        return this.http.get(this.ticketStatusServedURL + "/" + branchId + "/" + deptId).pipe(
            map((events: any) => events.sort((a: TSServed, b: TSServed) => a.ticket > b.ticket ? 1 : -1))
        );
    }

    getTSOthersData(branchId: number, deptId: number) {

        return this.http.get(this.ticketStatusOtherURL + "/" + branchId + "/" + deptId).pipe(
            map((events: any) => events.sort((a: TSOther, b: TSOther) => a.ticket > b.ticket ? 1 : -1))
        );
    }

    getEmiratesByBranchIds(branchIds : number[]){

        return this.http.get(this.emiratesURL , {headers}).pipe(
            map((data: any) => data.filter((branch: any) => {
                return branchIds.includes(branch.id);
            })
            )
        );

    }

    getBranchOverviewData(): Observable<AvgWaitingTimeBranch[]> {

    return this.http.get(this.branchDataUrl).pipe(
        map((events: any) => events.sort((a: AvgWaitingTimeBranch, b: AvgWaitingTimeBranch) => a.name > b.name ? 1 : -1))
    );

    }

    findBranchOverviewDataByBranchIds(branchIds : number[]){

        return this.http.get(this.branchDataUrl).pipe(
            map((data: any) => data.filter((awt: AvgWaitingTimeBranch) => {
                return branchIds.includes(awt.id);
            })
            )
        ).pipe(
            map((events: any) => events.sort((a: AvgWaitingTimeBranch, b: AvgWaitingTimeBranch) => a.name > b.name ? 1 : -1))
        );
    }

    getQueueOverviewDataByBranchId(branchId: number) {

        return this.http.get(this.branchDataUrl + "/" + branchId).pipe(
            map((events: any) => events.sort((a: AvgWaitingTimeBranch, b: AvgWaitingTimeBranch) => b.served - a.served))
        );
    }

    getServedAndWaitingDeptbyBranchIdWP(branchId : string){

        return this.http.get(this.emiratesURL + "/" + branchId);
    }

    getServedAndWaitingDeptbyBranchId(branchId : string, page : number, limit : number){

        const params = new HttpParams({
            fromObject: {
              page: page.toString(),
              limit: limit.toString(),
            }
          });

        return this.http.get(this.departmentsURL + "/" + branchId , { params: params });
    }

    getAllServedAndWaitingDept(branchIds : number[] , page : number, limit : number){

           const requestBody = {
              branchIds : branchIds,
              page: page.toString(),
              limit: limit.toString(),
            };

        return this.http.post(this.departmentsURL , requestBody);
    }

    getAllServicePointsByBranchId(branchId: number) {

        return this.http.get(this.servicePointsURL + "/" + branchId).pipe(
            map((events: any) => events.sort((a: CounterStatus, b: CounterStatus) => a.status > b.status ? -1 : 1))
        );
    }

    getCounterStatusHospitalData(branchIds : number[]): Observable<AvgWaitingTimeBranch[]> {
    
     return this.http.get(this.branchDataUrl).pipe(
            map((data: any) => data.filter((awt: AvgWaitingTimeBranch) => {
                    return branchIds.includes(awt.id);
            })
            )
        ).pipe(
            map((events: any) => events.sort((a: AvgWaitingTimeBranch, b: AvgWaitingTimeBranch) => a.name > b.name ? 1 : -1))
        );

    }

    getCounterStatusLiveData(branchId : number): Observable<CounterStatusLive[]> {

        return this.http.get(this.counterStatusLive+ "/" + branchId).pipe(
            map((events: any) => events.sort((a: CounterStatusLive, b: CounterStatusLive) => a.name > b.name ? 1 : -1))
           );
   
       }
    
    getHeapData(branchIds : number[] , startDate : string , endDate : string) {

        const requestBody = {
            branchIds : branchIds,
            startDate: startDate,
            endDate: endDate,
          };

      return this.http.post(this.heapDataURL , requestBody);
    }
}
