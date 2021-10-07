import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeService {

  private modeSource = new BehaviorSubject<boolean>(true);
  mode = this.modeSource.asObservable()
  
  constructor() { }
  
  changeMode(mode: boolean) {
    this.modeSource.next(mode);
  }
}
