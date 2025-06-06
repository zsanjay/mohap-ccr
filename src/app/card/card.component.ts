import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() title: string = "";
  @Input() viewAll : boolean;
  @Input() viewRect : boolean;
  @Input() viewPeak : boolean;
  @Input() displayContents : boolean = false;
  @Input() activeLink : string;

  constructor() { }

  ngOnInit(): void {
    
  }

}
