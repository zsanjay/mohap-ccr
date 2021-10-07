
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateSuffix' })
export class DateSuffix implements PipeTransform {
    transform(value: any): any {

    if(value != null){

     let date =  value.split(" ");
    
     let dayName = date[0] + ",";
     let day = date[1];

        if (day === '1' || day === '21' || day === '31') {
            day = day + 'st';
        } else if (day === '2' || day === '22') {
            day = day + 'nd';
        } else if (day === '3' || day === '23') {
            day = day + 'rd';
        }else{
            day = day + 'th';
        }

        return dayName + " " + day + " " + date[2];
    }

        return value;

    }
}