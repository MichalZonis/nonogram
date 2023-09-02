import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Game from 'src/app/models/game';
import Score from 'src/app/models/score';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GameService } from 'src/app/services/game.service';
import { BoardComponent } from '../board/board.component';
import { ClockComponent } from '../clock/clock.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @ViewChild(BoardComponent) board!: BoardComponent;
  @ViewChild(ClockComponent) stopwatch!: ClockComponent;

  game!: Game
  width: number = 0;
  height: number = 0;

  didWon: boolean = false
  gameIsOn: boolean = false
  newScore!: any

  //TODO: refactor components so this will be in hints
  columnGroups: Array<Array<number>> = []
  rowGroups: Array<Array<number>> = []

  defineSizeForm = new FormGroup({
    height: new FormControl('', [Validators.min(1), Validators.required]),
    width: new FormControl('', [Validators.min(1), Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder,
    private GameService: GameService,
    private auth: AuthenticationService,
    private router: Router,

  ) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

  async StartGame() {

    this.didWon = false;
    this.gameIsOn = false;

    const gameRes = this.GameService.GetGameBySize(+this.defineSizeForm.value.width!, +this.defineSizeForm.value.height!)//.subscribe((gameRes: any) => {
    if (gameRes) {
      this.gameIsOn = true;

      //Set board size
      this.width = +this.defineSizeForm.value.width!
      this.height = +this.defineSizeForm.value.height!

      this.game = await gameRes;

      // TODO: refactor with "Grid"
      //Calaculate row and column data
      this.calculateGame(this.game.Sequence);

      //Start clock
      this.stopwatch.clearTimer();
      this.stopwatch.startTimer();
    } else {
      this.gameIsOn = false;
    }
    //}, err => {
    this.stopwatch.clearTimer();
    this.gameIsOn = false
    this.width = 0
    this.height = 0
    this.calculateGame("");
    //  console.log(err)
    console.log(this.game)
    //})


  }

  calculateGame(game: string) {
    if (game) {

      // calculate column clues
      let columnGroups = new Array(this.width);
      for (let colIndex = 0; colIndex < columnGroups.length; colIndex++) {
        columnGroups[colIndex] = new Array();
        let currGroupLength = 0;
        //searching the col for groups
        for (let rowIndex = 0; rowIndex < this.height; rowIndex++) {
          //if the cell is empty
          if (game[(this.width) * (rowIndex) + colIndex] == '-') {
            columnGroups[colIndex].push(currGroupLength);
            currGroupLength = 0;
          }
          else {
            currGroupLength++;
          }
        }
        columnGroups[colIndex].push(currGroupLength);

        // filter out groups of zero
        columnGroups[colIndex] = columnGroups[colIndex].filter((groupSize: number) => { return groupSize > 0 })
      }

      // calculate row clues
      let rowGroups = new Array(this.height);
      for (let rowIndex = 0; rowIndex < rowGroups.length; rowIndex++) {
        rowGroups[rowIndex] = new Array();
        let currGroupLength = 0;
        //searching the col for groups
        for (let colIndex = 0; colIndex < this.width; colIndex++) {
          //if the cell is empty
          if (game[(this.width) * (rowIndex) + colIndex] == '-') {
            rowGroups[rowIndex].push(currGroupLength);
            currGroupLength = 0;
          }
          else {
            currGroupLength++;
          }
        }
        rowGroups[rowIndex].push(currGroupLength);

        // filter out groups of zero
        rowGroups[rowIndex] = rowGroups[rowIndex].filter((groupSize: number) => { return groupSize > 0 })
      }

      // put the clues in the properties
      this.rowGroups = rowGroups;
      this.columnGroups = columnGroups;

    }
  }

  checkWin() {
    let boardSeq = this.board.createBoardString();
    this.GameService.CheckWin(this.game._id, boardSeq).subscribe((res) => {
      console.log(res);
      if (res) {
        this.winner();
      }
      else {
        //this.tryAgain();
      }
    })
  }

  winner() {
    this.GameService.saveScore(
      this.stopwatch.getTime(),
      this.auth.getUserDetails()._id,
      this.game._id)
      .subscribe(res => {
        console.log(res)
        this.newScore = res
      })

    this.stopwatch.clearTimer();
    this.didWon = true;
    this.defineSizeForm.reset();
    this.board.initGameBoard();
  }


  createRange(r: number) {
    return new Array(r);
  }

  calculateMaxArray(twoDArray: Array<Array<number>>): number {
    const tempArray: Array<Array<number>> = [];
    twoDArray.forEach(val => tempArray.push(Object.assign([], val)));
    return tempArray.sort((a, b) => { return b.length - a.length; })[0].length
  }

  redirectToScoreBoard() {
    this.router.navigateByUrl('/register');
  }

  
}
