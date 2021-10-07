import { Injectable } from "@angular/core";
import html2canvas from "html2canvas";

@Injectable({
    providedIn: 'root'
})
export class PrintService{

    public print(tableId : string){

        let data : any = document.getElementById(tableId);
        html2canvas(data).then(canvas => {
        
            var nWindow = window.open('');
            
            if(nWindow != null){
            nWindow.document.body.appendChild(canvas);
            nWindow.focus();
            nWindow.print();
            location.reload();
            nWindow.close();
            }
          });
    }
}