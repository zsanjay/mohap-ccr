import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {  Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ModeService } from '../services/mode.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  menuItems = ['dashboard.dashboard', 'dashboard.branches', 'dashboard.counters', 'dashboard.ticket_status' , 'dashboard.emirates'];
  mohapLogo = "assets/images/mohap-rbg.png";
  ehsLogo = "assets/images/ehs-rbg.png";
  isDarkTheme : boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver , private modeService : ModeService , private translate : TranslateService , private router : Router) {}
  ngOnInit(): void {
    //this.isDarkTheme = localStorage.getItem('theme') === "Dark" ? true : false;
     this.modeService.mode.subscribe(result => {
      this.isDarkTheme = result;
    });
  }

  
  storeThemeSelection() {
   // localStorage.setItem('theme', this.isDarkTheme ? "Dark" : "Light");
  }

  getFirstLetter(item : string){

    let first_char = "";

   this.translate.get(item).subscribe((res: string) => {
    first_char = res;
  });
    return first_char.charAt(0).toUpperCase();
  }

}
