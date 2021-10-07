import { Injectable } from "@angular/core";
import { FilterService } from "./filter.service";
import { RegionService } from "./regions.service";

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  hospitalColors = ['blue', 'purple', 'green', 'orange'];

  constructor(private regionService: RegionService , private filterService : FilterService) {

  }

  public getFirstLetter(item: string) {

    return item.charAt(0).toUpperCase();
  }

  public getColor(index: number) {

    let res;

    if (index % this.hospitalColors.length == 0)
      res = this.hospitalColors[((index - 1) % this.hospitalColors.length)];
    else
      res = this.hospitalColors[(index % this.hospitalColors.length) - 1];

    return res;
  }


  public getAverageTime(timeInSec: number) {

    let minutes = Math.floor(timeInSec / 60);
    let seconds = timeInSec % 60;

    if (seconds.toString().length == 1)
      return minutes + ":" + "0" + seconds;

    return minutes + ":" + seconds;
  }

  public getAverageTimeMins(timeInSec: number) {

    let minutes = Math.floor(timeInSec / 60);
    return minutes;
  }

  public getTimeColor(timeInSec: number) {

    let mins = this.getAverageTimeMins(timeInSec);

    if (mins > 30) {
      return { 'color': '#E03E26' };
    } else if (mins > 15 && mins <= 30) {
      return { 'color': '#FFBF00' };
    } else {
      return { 'color': '#38AE3D' };
    }
  }

  public getTimeColorForMins(mins: number) {

    if (mins > 30) {
      return { 'color': '#E03E26' };
    } else if (mins > 15 && mins <= 30) {
      return { 'color': '#FFBF00' };
    } else {
      return { 'color': '#38AE3D' };
    }
  }

  public checkBranchIdExists(regionBranchIDs : number[] , accountBranchIds : number[]){

    let hasAccess = false;
    regionBranchIDs.forEach((id : number) => {

      if(accountBranchIds.includes(id))
      hasAccess = true;

    })

    return hasAccess;

  }

  public getBranchIds(regionBranchIDs : number[] , accountBranchIds : number[]){

    let ids : any = [];
    regionBranchIDs.forEach((id : number) => {

      if(accountBranchIds.includes(id))
      ids.push(id);

    })

    return ids;

  }
  
}