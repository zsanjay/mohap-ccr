import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  title = 'mohap-dashboard';

  userActivity : any;
  userInactive: Subject<any> = new Subject();
 
  constructor(translate: TranslateService , public router : Router) {
    this.setTimeout();
    this.userInactive.subscribe(() => { 
      window.location.reload();
     });
  }

  changeDashboardColor(color: any) {
    var body = document.getElementsByTagName('body')[0];
    if (body && color === 'white-content') {
      body.classList.add(color);
    }
    else if (body.classList.contains('white-content')) {
      body.classList.remove('white-content');
    }
  }

  checkRouterPath(){
    //|| this.router.url.indexOf('/served-and-waiting-dept') > -1
   return  this.router.url === '/dashboard';
  }

  
  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 20000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

}
