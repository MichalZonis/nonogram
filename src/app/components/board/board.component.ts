import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {states} from '../../models/states.enum';
import { Cell } from 'src/app/models/cell.model';
import Game from '../../models/game';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnChanges {

  @Input() height: number = 7
  @Input() width: number  = 7
  game: Cell[][] = this.initGameBoard()
  @Input() disableEmptyState: boolean = false

  constructor(
    GeneralService: GeneralService
  ) { }

  ngOnInit(): void {
    //this.initGameBoard();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("change")
    this.game = this.initGameBoard()
  }

  initGameBoard (gameString?: string) : Cell[][] {
    console.table(this.game)

    return new Array(this.height).fill("").map(() => new Array(this.width).fill("").map(()=> new Cell()));
  }

  createRange(r: number) {
    return new Array(r);
  }

  toggleState(row: number, column:number) {
    this.game[row][column].setNextState(this.disableEmptyState);
    console.log('1.', "toggle", row, column, this.game[row][column].isBlackened(), Date() )
  }

  createBoardString() : string{
    let res: string = "";
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if(this.game[i][j].isBlackened()){
          res += '*';
        }
        else {
          res += '-';
        }
      }
    }

    return res;
  }
}
