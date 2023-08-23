import { Component, OnInit } from '@angular/core';
import Game from 'src/app/models/game';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  puzzles: Game[] = []
  sortOption = 1

  constructor(
    private gameService: GameService,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    let id = this.auth.getUserDetails()._id
    this.gameService.getPuzzlesByUser(id).subscribe((puzzles:any) => {
      this.puzzles = puzzles
    })
  }

  reorganize(): void {
    switch (this.sortOption) {
      case 1:
        this.puzzles.sort((puzzleA, puzzleB )=> puzzleA.CreationTime.getTime() - puzzleB.CreationTime.getTime())
        break;
      case 2:
          this.puzzles.sort((puzzleA, puzzleB )=> (puzzleA.Width*puzzleA.Height) - (puzzleA.Width*puzzleA.Height))
          break;
      default:
        break;
    }
  }

}
