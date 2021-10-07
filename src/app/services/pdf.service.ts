import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Injectable({
    providedIn: 'root'
})
export class PDFService {

    header : any = [];
    rows : any = [];
    row : any = [];

    public createPdf(columns : string[] , head: any, data: any , heading : string , fileName : string) {
 
        var doc = new jsPDF();
        this.header = [];
        this.rows = [];
        
        head.forEach((col : any) => {
            this.header.push(col);
        })

        data.forEach((row : any , index : number) => { 
            this.row = []; 
            for(var i = 0; i < this.header.length; i++){
                let temp = [data[index][this.header[i]]];
                this.row.push(temp);
            } 
              this.rows.push(this.row);
        }); 
        
        doc.setFontSize(18);
        doc.text(heading, 11, 8);
        doc.setFontSize(11);
        doc.setTextColor(100);


        (doc as any).autoTable({
            head: [columns],
            body: this.rows,
            theme: 'plain',
            didDrawCell: (data: any) => {
                // console.log(data.column.index)
            }
        })

        // below line for Open PDF document in new tab
        // doc.output('dataurlnewwindow')

        // below line for Download PDF document  
        doc.save(fileName);
    }

}