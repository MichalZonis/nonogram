import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  @Input() width: number = 7
  game!: Cell[][] 
  @Input() disableEmptyState: boolean = false
  @Input() BoardSeq: string = ""

  constructor(
    GeneralService: GeneralService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("change")
    console.log(changes)
    this.initGameBoard()
    console.log(this.game)
   
  }
  
  ngDoCheck() {
  }

  initGameBoard() : void {
    
    console.count()
    console.log("seq:" , this.BoardSeq)
    console.log(this.width,this.height)
    //console.table(this.game)
    //debugger
    if (this.width && this.height) {
    let board = new Array(this.height).fill("").map(() => new Array(this.width).fill("").map(() => new Cell()))
    //debugger
    console.log("let board = new Array(this.height)", board)
    //board.fill("")
    //board.map(() => new Array(this.width).fill("").map(() => new Cell()))
    console.log(board)
    if (this.BoardSeq) {
      console.log(this.BoardSeq)
      for (let i = 0; i < this.height; i++) {
        for (let j = 0; j < this.width; j++) {
          if (this.BoardSeq.charAt(this.width*i + j) == '*') {
            console.log(board[i][j], i , j)
            board[i][j].setNextState(this.disableEmptyState);
          }
        }
      }
    }

    console.log(board)
    this.game = board
  }
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
  
  setHeight(height: number) {
    this.height = height
  }

  setWidth(width: number) {
    this.width = width
  }
}
