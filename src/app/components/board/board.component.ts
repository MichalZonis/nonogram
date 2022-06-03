import { Component, OnChanges, OnInit } from '@angular/core';
import {states} from '../../models/states.enum';
import { Cell } from 'src/app/models/cell.model';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  height: number = 7
  width: number  = 5
  game: Cell[][] = this.initGameBoard()

  constructor() { }

  ngOnInit(): void {
    //this.initGameBoard();
  }

  initGameBoard () : Cell[][] {
    console.table(this.game)
    return new Array(this.height).fill("").map(() => new Array(this.width).fill("").map(()=>new Cell()));
  }

  createRange(r: number) {
    return new Array(r);
  }

  toggleState(row: number, column:number) {
    this.game[row][column].setNextState();
    console.log('1.', "toggle", row, column, this.game[row][column].isBlackened(), Date() )
  }

}
