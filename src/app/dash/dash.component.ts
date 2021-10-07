import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent {

  titles = ["Avg Waiting Time" , "Avg Transaction Time" , "Served Per Emirates"];
  
  constructor(private breakpointObserver: BreakpointObserver) {}

  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 2 },
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 4 },
        };
      }
 
     return {
        columns: 3,
        miniCard: { cols: 1, rows: 2 },
        chart: { cols: 2, rows: 2 },
        table: { cols: 2, rows: 2 },
      };
    })
  );

  

}
