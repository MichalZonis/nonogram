import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import Game from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'app-gallery-tile',
  templateUrl: './gallery-tile.component.html',
  styleUrls: ['./gallery-tile.component.css']
})
export class GalleryTileComponent implements OnInit, AfterViewInit {


 @ViewChild(BoardComponent) board!: BoardComponent;

 @Input() game!: Game

  constructor(
    private gameService: GameService,
    private cdRef: ChangeDetectorRef
  ) { }
    
  ngOnChanges() {}

  ngOnInit(): void {}

  ngAfterViewInit() {}

  ngOnDestroy() {  }
}
