import { Component, Input, OnInit } from '@angular/core';
import Score from 'src/app/models/score';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent implements OnInit {

  @Input() puzzleID: string = ""
  scores: Score[] = []
  @Input() newScore!: Score
  constructor(
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.gameService.getScoresByGame(this.puzzleID).subscribe((res: any)=> {
      this.scores = res
      console.log(this.newScore)
    })
  }

}
