import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { states } from 'src/app/models/states.enum';

@Component({
  selector: 'app-board2',
  templateUrl: './board2.component.html',
  styleUrls: ['./board2.component.css']
})
export class Board2Component implements OnInit {

  @Input() rows = 4;
  @Input() cols = 16;
  gridState: states[][] = new Array(this.rows).fill("").map(() => new Array(this.cols).fill(states.undecided))
  states = states;
  @Input() BoardSeq: string = "-*-*-*****-***---*--"
  @Input() parentWidth: number = window.innerWidth
  @Input() isReadOnly = false;

  cell_width!: number;

  constructor() { }

  ngOnInit(): void {
    this.calcCellMeasures()
    this.populateGrid();
  }

  calcCellMeasures() {
    const max_width_table = this.parentWidth * 100 / 100;
    this.cell_width = 30;
    if (this.cols * this.cell_width > max_width_table) {
      this.cell_width = max_width_table / this.cols
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    //console.log(changes)
    if (changes["parentWidth"])
      this.calcCellMeasures()
  }

  populateGrid() {
    let tmpGrid: states[][] = new Array(this.rows).fill("").map(() => new Array(this.cols).fill(states.undecided))

    // if the board need to be initialized according to a sequence then blacken the cells accordingly
    if (this.BoardSeq) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          if (this.BoardSeq.charAt(this.cols * i + j) == states.black) {
            tmpGrid[i][j] = states.black;
          }
        }
      }
    }

    this.gridState = tmpGrid
  }

  forwardToggle(row: number, col: number) {
    let enumVals = Object.values(states)
    let index = enumVals.indexOf(this.gridState[row][col])
    let next = enumVals[(index + 1) % 3]
    this.gridState[row][col] = next
  }

  backwardToggle(row: number, col: number) {
    let enumVals = Object.values(states)
    let index = enumVals.indexOf(this.gridState[row][col])
    let next = enumVals[(index + 2) % 3]
    this.gridState[row][col] = next
    return false;
  }

  
}
