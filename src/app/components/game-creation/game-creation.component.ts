import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'app-game-creation',
  templateUrl: './game-creation.component.html',
  styleUrls: ['./game-creation.component.css']
})
export class GameCreationComponent implements OnInit {

  @ViewChild(BoardComponent) board!: BoardComponent;

  width: number = 3
  height:number = 3
  BoardName: string = ''

  defineSizeForm = this.formBuilder.group({
    height: '',
    width: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private router: Router
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
      this.router.navigateByUrl('/login')
    }
    console.log(this.board.createBoardString())
    console.log(this.BoardName)
    //TODO: send board string to server to save
  }
}
