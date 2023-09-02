import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-hints',
  templateUrl: './hints.component.html',
  styleUrls: ['./hints.component.css']
})
export class HintsComponent implements OnInit {

  @Input() groups: Array<Array<number>> = [];
  @Input() position!: "horizontal" | "vertical";
  //@Input() gameID: string = "";
  @Input() gridWidth!: number;
  @Input() gridHeight!: number;
  cols!: number;
  rows!: number;
  @Input() cell_width!: number;
  // @Input() parentWidth: number = window.innerWidth


  constructor(
    private GameService: GameService
  ) { }

  ngOnInit(): void {
    
    if (this.position == "horizontal") {
      this.rows = this.gridHeight;
      this.cols = this.calcMaxGroupSize()
    } else {
      this.rows = this.calcMaxGroupSize()
      this.cols = this.gridWidth
    }
  }

  // calcCellMeasures() {
  //   const max_width_table = this.parentWidth * 100 / 100;
  //   this.cell_width = 30;
  //   if (this.cols * this.cell_width > max_width_table) {
  //     this.cell_width = max_width_table / this.cols
  //   }
  // }

  /*
    calculateGame (game: string, ) {
      let columnGroups = new Array(this.width);
      for (let colIndex = 0; colIndex < columnGroups.length; colIndex++) {
        columnGroups[colIndex] = new Array();
        let currGroupLength = 0;
        //searching the col for groups
        for(let rowIndex = 0; rowIndex < this.height; rowIndex++) {
          //if the cell is empty
          if(game[(this.width)*(rowIndex) + colIndex] == '-'){
            columnGroups[colIndex].push(currGroupLength);
            currGroupLength = 0;
          }
          else {
            currGroupLength++;
          }
        }
        columnGroups[colIndex].push(currGroupLength);
        columnGroups[colIndex] = columnGroups[colIndex].filter((groupSize: number) => {return groupSize > 0 })
      }
      console.table(columnGroups)
  
      let rowGroups = new Array(this.height);
      for (let rowIndex = 0; rowIndex < rowGroups.length; rowIndex++) {
        rowGroups[rowIndex] = new Array();
        let currGroupLength = 0;
        //searching the col for groups
        for(let colIndex = 0; colIndex < this.width; colIndex++) {
          //if the cell is empty
          if(game[(this.width)*(rowIndex) + colIndex] == '-'){
            rowGroups[rowIndex].push(currGroupLength);
            currGroupLength = 0;
          }
          else {
            currGroupLength++;
          }
        }
        rowGroups[rowIndex].push(currGroupLength);
        rowGroups[rowIndex] = rowGroups[rowIndex].filter((groupSize: number) => {return groupSize > 0 })
      }
      console.table(rowGroups)
      this.rowGroups = rowGroups;
      this.columnGroups = columnGroups;
    }
  
    calculateMaxArray(twoDArray: Array<Array<number>>): number {
      const tempArray : Array<Array<number>> = [];
      twoDArray.forEach(val => tempArray.push(Object.assign([], val)));
      return tempArray.sort((a, b) => { return b.length - a.length;})[0].length
    }*/

  calcMaxGroupSize() {
    return Math.max(...this.groups.map(group => group.length))
  }

  // createRange(r: number) {
  //   return new Array(r);
  // }
}
