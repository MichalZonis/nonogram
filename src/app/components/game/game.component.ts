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
    console.log(this.defineSizeForm.value)
    let size = {width: this.defineSizeForm.value.width,
                height: this.defineSizeForm.value.height}
    console.log(size)
    let game = this.GameService.GetGameBySize(size.width, size.height)
    console.log(this.GameService.GetGameBySize(size.width, size.height))
    this.calculateGame(game.game)
  }

    defineBoardSize (): void {
  }

  calculateGame (game: string) {

  }
}
