import { Component, Input, OnInit } from '@angular/core';
import {states} from '../../models/states.enum';
import { Cell } from 'src/app/models/cell.model';
import Game from '../../models/game';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  height: number = 3
  width: number  = 4
  game: Cell[][] = this.initGameBoard()
  @Input() gameTemplate: Game = {game: "*-----**-----",
                                 size: {width: 4,
                                        height: 3}}

  constructor() { }

  ngOnInit(): void {
    //this.initGameBoard();
  }

  initGameBoard (gameString?: string) : Cell[][] {
    console.table(this.game)
    //TODO: calculate win: use this code
   /* let populatedBoard = new Array(this.height).fill("").map(() => new Array(this.width).fill("").map(()=>new Cell()));
    this.gameTemplate.game.split("").map((curr, index) => {
      if(curr == '*') {
        populatedBoard[index % this.gameTemplate.size.width - 1][index % this.gameTemplate.size.height - 1].setState(states.black);
      }
    })
    this.width = this.gameTemplate.size.width;
    this.height = this.gameTemplate.size.height;
*/
   /* for (let row = 0; row < this.gameTemplate.size.height; row++) {
      for (let column = 0; column < this.gameTemplate.size.width; column++) {

      }
    }*/
    //return populatedBoard;
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
