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
  
  constructor(
    private gameService: GameService,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    let id = this.auth.getUserDetails()._id
    this.gameService.getPuzzlesByUser(id).subscribe((puzzles:any) => {
      this.puzzles = puzzles//.map((obj: any)=> {return obj._id})
      console.log(this.puzzles)
    })
  
  }

}
