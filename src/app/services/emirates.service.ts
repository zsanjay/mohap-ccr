import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { DataProvider } from "../data-provider";
import { Emirates } from "../models/emirates.model";

@Injectable({
    providedIn: 'root'
  })
  export class EmiratesService {
  
    public data = new Subject<Emirates[]>();

  
    constructor(private dataProvider: DataProvider) {
  
    }
  
    loadData() {
    
    this.dataProvider.getEmiratesData().subscribe((res : any)   => this.data.next(res));
      
    }
  
  }