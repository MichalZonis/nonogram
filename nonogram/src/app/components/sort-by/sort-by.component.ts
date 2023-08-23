import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.css']
})
export class SortByComponent implements OnInit {

  sortOption: string = 'Creation Date'
  options!: [] //=  arraymap of options @{}
  constructor() { }

  ngOnInit(): void {
  }

}
