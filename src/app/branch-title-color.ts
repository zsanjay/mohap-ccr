import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";

@Directive({
    selector: '[appBranchTitleColor]'
})
export class BranchTitleColor implements OnInit {
    @Input() appBranchTitleColor: any;

    constructor(private el: ElementRef) { }

    ngOnInit() {
        const nativeEl: HTMLElement = this.el.nativeElement;
        nativeEl.classList.add('data-letters-' + this.appBranchTitleColor);
    }

}