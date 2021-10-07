import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataProvider } from 'src/app/data-provider';
import { FilterService } from 'src/app/services/filter.service';
import { UtilityService } from 'src/app/services/utility.service';
import { TSOthersDataSource } from './ts-other-datasource';
import { TSServedDataSource } from './ts-served-datasource';
import { TSWaitingDataSource } from './ts-waiting-datasource';

@Component({
  selector: 'app-ticket-status',
  templateUrl: './ticket-status.component.html',
  styleUrls: [
    './ticket-status.component.css',
    "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
  ]
})
export class TicketStatusComponent implements OnInit , AfterViewInit , OnDestroy {

  displayedColumnsWaiting = ['ticket', 'queueName', 'wtTime' , 'totalWtTime'];
  displayedColumnsServed = ['ticket', 'staffName', 'wtTime' , 'servedTime' ,'totalTime'];
  displayedColumnsOthers = ['ticket', 'type' , 'wtTime'];
  dataSourceWaiting : TSWaitingDataSource;
  dataSourceServed : TSServedDataSource;
  dataSourceOthers : TSOthersDataSource;
  @ViewChild('WSort') wSort!: MatSort;
  @ViewChild('SSort') sSort!: MatSort;
  @ViewChild('OSort') oSort!: MatSort;
  branchId : number;
  queueId : number;
  deptSubs : Subscription;
  selectedTab : string;
  queueName : string;

  model = {
    left: true,
    middle: false,
    right: false
  };
  
  constructor(private dataProvider : DataProvider , private filterService : FilterService , private route : ActivatedRoute , private utilityService : UtilityService ) { }

  ngOnInit(): void {

    this.route.params.forEach(param => {

      if(param['queueId'])
      this.queueId = Number.parseInt(param['queueId']);
      if(param['branchId'])
      this.branchId = Number.parseInt(param['branchId']);
      if(param['queueName'])
      this.queueName = param['queueName'];

      this.selectedTab = param['tab'];

      let tab = document.getElementById(this.selectedTab);

      if(tab != null)
      tab.click();
      
      })
      
    this.dataSourceWaiting = new TSWaitingDataSource(this.dataProvider , this);
    this.dataSourceServed = new TSServedDataSource(this.dataProvider);
    this.dataSourceOthers = new TSOthersDataSource(this.dataProvider);

    if(this.branchId != undefined){

    this.dataSourceWaiting.loadData(this.branchId , this.queueId , this.queueName);
    this.dataSourceServed.loadData(this.branchId , this.queueId);
    this.dataSourceOthers.loadData(this.branchId , this.queueId);

    }

  }

  ngAfterViewInit() {

    this.dataSourceWaiting.sort = this.wSort;
    this.dataSourceServed.sort = this.sSort;
    this.dataSourceOthers.sort = this.oSort;

    this.deptSubs = this.filterService.tsWaitingDeptId.subscribe(criteria => {

        this.branchId = criteria.branchId;
        this.queueId = criteria.deptId;
        this.dataSourceWaiting.loadData(criteria.branchId , criteria.deptId , criteria.deptName);
        this.dataSourceServed.loadData(criteria.branchId , criteria.deptId);
        this.dataSourceOthers.loadData(criteria.branchId , criteria.deptId);   
  })
    
  }
  

  openPanel(event : any, tabName : string){

    this.filterService.changeTab({
      id : this.branchId,
      deptId : this.queueId,
      name : tabName
    });
    
    
  let i, tabcontent : HTMLElement[], tablinks;

  tabcontent = Array.from(document.getElementsByClassName('tabcontent') as HTMLCollectionOf<HTMLElement>)

  for (i = 0; i < tabcontent.length; i++) {

    let content = tabcontent[i];

    if(content != null)
    content.style.display = "none";

  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
   let childElement = (tablinks[i].children[0] as HTMLElement);
   childElement.style.color = "#7D7C7B";

  }
  let tabElement = document.getElementById(tabName);

  if(tabElement != null)
  tabElement.style.display = "contents";

  event.currentTarget.className += " active";
  event.currentTarget.children[0].style.color = "#F0EDEB";

  }

  sortWaitingData(sort : Sort){
    this.dataSourceWaiting.getSortedData(sort);
  }

  sortServedData(sort : Sort){
    this.dataSourceServed.getSortedData(sort);
  }

  sortOthersData(sort : Sort){
    this.dataSourceOthers.getSortedData(sort);
  }

  getWaitingTime(timeInSec : number){
    return  this.utilityService.getAverageTime(timeInSec);
    }

  getTimeColor(timeInSec : number){
      return this.utilityService.getTimeColor(timeInSec);
    }

    setQueueName(queueName : string){
      this.queueName = queueName;
    }

  ngOnDestroy(): void {
    this.deptSubs.unsubscribe();
  }

}

