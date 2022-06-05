import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  defineSizeForm = this.formBuilder.group({
    height: '',
    width: ''
  });

  constructor(
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
  }

  defineBoardSize (): void {
    console.log(this.defineSizeForm.value)
  }
}
