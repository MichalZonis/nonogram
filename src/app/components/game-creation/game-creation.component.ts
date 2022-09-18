import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GameService } from 'src/app/services/game.service';
import { BoardComponent } from '../board/board.component';
import Game from '../../models/game'
@Component({
  selector: 'app-game-creation',
  templateUrl: './game-creation.component.html',
  styleUrls: ['./game-creation.component.css']
})
export class GameCreationComponent implements OnInit {

  @ViewChild(BoardComponent) board!: BoardComponent;

  width: number = 3
  height:number = 3
  PuzzleName: string = ''
  BoardSeq = ''

  defineSizeForm = this.formBuilder.group({
    height: '',
    width: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private gameService: GameService
  ) { }

  ngOnInit(): void {
  }

  createBoard(): void {
    console.log(this.defineSizeForm.value.width)
    console.log(this.defineSizeForm.value.height)

    //Set board size
    this.width = this.defineSizeForm.value.width
    this.height = this.defineSizeForm.value.height
  }

  CreateGame(): void {

    if(!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/login') // TODO: not redirecting at the moment
    }
    let newGame: Game = {
      Name: this.PuzzleName,
      Author: this.auth.getUserDetails()._id,
      CreationTime: new Date(),
      Sequence: this.board.createBoardString(),
      Height: this.height,
      Width: this.width,
      _id: ""
    }

    console.log(newGame)

    this.gameService.saveGame(newGame).subscribe((res) => {console.log(res.token)})
    console.log(this.board.createBoardString())
    console.log(this.PuzzleName)

    this.BoardSeq = ''
    this.board.initGameBoard()
    this.defineSizeForm.reset()

  }

  setBoardSeq(boardSeq: string) {
    this.BoardSeq = boardSeq
  }
}
