import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-board2',
  templateUrl: './board2.component.html',
  styleUrls: ['./board2.component.css']
})
export class Board2Component implements OnInit {

  rows = new Array<number>(3);
  cols = new Array<number>(6);

  dynamicWidth =  `calc(100% / ${this.cols.length})`
  @ViewChild('table') grid!: ElementRef;


  constructor() { }

  ngOnInit(): void {
    console.log(this.dynamicWidth)
  }
  
  ngAfterViewInit() {
    console.log(this.grid.nativeElement.offsetWidth)
    console.log(window.innerWidth)

  }
}
