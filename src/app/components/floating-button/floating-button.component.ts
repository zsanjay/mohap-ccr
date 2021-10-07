import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModeService } from 'src/app/services/mode.service';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.css']
})
export class FloatingButtonComponent implements OnInit {

  settingIcon = 'assets/images/settings_white_18dp.png';
  checkedMode = true;
  langMode = true;

  constructor(private modeService : ModeService , private translateService : TranslateService) { }

  ngOnInit(): void {

  }

  onModeChanged(){
    this.checkedMode = !this.checkedMode;
    this.modeService.changeMode(this.checkedMode);
  }

  onLangChanged(lang : string){
    this.langMode = !this.langMode;
    this.translateService.use(lang);
  }

}
