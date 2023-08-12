import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Game from 'src/app/models/game';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'app-gallery-tile',
  templateUrl: './gallery-tile.component.html',
  styleUrls: ['./gallery-tile.component.css']
})
export class GalleryTileComponent implements OnInit {

  @ViewChild(BoardComponent) board!: BoardComponent;

  @Input() game!: Game
  @ViewChild('tile') tile!: ElementRef;
  width!: number

  constructor() { }

  ngOnInit() {
    this.width = this.tile.nativeElement.offsetWidth;
  }

  calcTileWidth() {
    this.width = this.tile.nativeElement.offsetWidth;
  }
}
