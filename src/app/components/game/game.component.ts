import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Game from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  game: Game = {game: "",
                size: {height: 3,
                      width: 4}}
  width: number = 7;
  height: number = 7;

  columnGroups: Array<Array<number>> = []
  rowGroups: Array<Array<number>> = []

  defineSizeForm = this.formBuilder.group({
    height: '',
    width: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private GameService: GameService
  ) {

  }

  ngOnInit(): void {
  }

  StartGame (): void {
    //Random game
    console.log(this.defineSizeForm.value)

    //Set board size
    this.width = this.defineSizeForm.value.width
    this.height = this.defineSizeForm.value.height
    console.log([this.width, this.height])

    let game = this.GameService.GetGameBySize(this.width, this.height)
    console.log(this.GameService.GetGameBySize(this.width, this.height))
    this.calculateGame(game.game)


    //Calaculate row and column data
    //Start clock

  }

  calculateGame (game: string) {
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

  calculateWin () {
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
  }

  createRange(r: number) {
    return new Array(r);
  }

  calculateMaxArray(twoDArray: Array<Array<number>>): number {
    return twoDArray.sort((a, b) => { return b.length - a.length;})[0].length 
  }
}
