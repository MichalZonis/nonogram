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
 // @Input() id: string = ''
 @Input() game!: Game
  /*@Input() width!: number;
  @Input() height!: number;
  @Input() boardSeq!: string;

  getBoardSeqsub: any ;
  */
  constructor(
    private gameService: GameService,
    private cdRef: ChangeDetectorRef
    ) { }
    
    ngOnChanges() {
      //this.board.initGameBoard()
    }
    ngOnInit(): void {
   // console.log(this.id)
    //let boardSeq;
    /*
    this.getBoardSeqsub = this.gameService.getBoardSeq(this.id).subscribe((game:any) => {
      console.log("tile")
      this.game = game
      this.height = this.game.Height
      this.width = this.game.Width
      this.boardSeq = this.game.Sequence
     // this.cdRef.detectChanges();
     console.log(this.game)
     //this.board.game = 
     this.board.initGameBoard()
      console.log(this.game)
     // console.log(this.board)
    })*/
    
  }

  //set b(board: BoardComponent) {

 // }
  ngAfterViewInit() {
  }

  ngOnDestroy() {
   // this.getBoardSeqsub.unsubscribe()
  }
}
