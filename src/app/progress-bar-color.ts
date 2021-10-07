import { Directive, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';

@Directive({
selector: '[appProgressBarColor]'
})
export class ProgressBarColor implements OnChanges{
static counter = 0;
color: string;
@Input() appProgressBarColor : any;
@Input() avgTime : number;
styleEl:HTMLStyleElement = document.createElement('style');

uniqueAttr = `app-progress-bar-color-${ProgressBarColor.counter++}`;

constructor(private el: ElementRef) { 
const nativeEl: HTMLElement = this.el.nativeElement;
nativeEl.setAttribute(this.uniqueAttr,'');
nativeEl.appendChild(this.styleEl);
}

ngOnChanges(changes: SimpleChanges): void{
this.updateColor();
}


updateColor(): void{

if (this.appProgressBarColor > this.avgTime){
  this.appProgressBarColor = 'orange'
} 
else if (this.appProgressBarColor <= 20){
  this.appProgressBarColor = 'limegreen'
}
else if (this.appProgressBarColor < this.avgTime){
  this.appProgressBarColor = 'limegreen'
}
// else{
//   this.appProgressBarColor = 'red'
// }


// update dynamic style with the uniqueAttr
this.styleEl.innerText = `
  [${this.uniqueAttr}] .mat-progress-bar-fill::after {
    background-color: ${this.appProgressBarColor};
  }
`;
 
}
}