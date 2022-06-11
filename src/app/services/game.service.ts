import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import Game from '../models/game';
@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private WebService: WebService) { }

   GetGameBySize(width: number, height: number) : Game {
    return {game: "*-----**-----",
            size: {width: 4,
                  height: 3}}
  }
}
