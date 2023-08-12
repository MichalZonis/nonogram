import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { states } from '../../models/states.enum';
import { Cell } from 'src/app/models/cell.model';
import Game from '../../models/game';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnChanges {

  @Input() height!: number
  @Input() width!: number
  game!: Cell[][]
  @Input() disableEmptyState: boolean = false
  @Input() BoardSeq: string = ""
  @Input() isReadOnly: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // initialize the board to size of width X height
    this.initGameBoard()
  }

  initGameBoard(): void {
    if (this.width && this.height) {
      var board = new Array(this.height).fill("").map(() => new Array(this.width).fill("").map(() => new Cell()))

      // if the board need to be initialized according to a sequence then blacken the cells accordingly
      if (this.BoardSeq) {
        for (let i = 0; i < this.height; i++) {
          for (let j = 0; j < this.width; j++) {
            if (this.BoardSeq.charAt(this.width * i + j) == '*') {
              board[i][j].setNextState(this.disableEmptyState);
            }
          }
        }
      }

      this.game = board
    }
  }

  createRange(r: number) {
    return new Array(r);
  }

  toggleState(row: number, column: number) {
    this.game[row][column].setNextState(this.disableEmptyState);
  }

  createBoardString(): string {
    let res: string = "";
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.game[i][j].isBlackened()) {
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
