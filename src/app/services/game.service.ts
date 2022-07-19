import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import Game from '../models/game';
@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private WebService: WebService) { }

   GetGameBySize(width: number, height: number) {
    return this.WebService.get(`game/${width}/${height}`);
  }

  CheckWin(id: string, boardSeq: string) {
    return this.WebService.get(`game/${id}/seq/${boardSeq}`);
  }

  getRowHints(id: string) {
    return this.WebService.get(`game/${id}/hints/rows`);
  }

  getColumnHints(id: string){
    return this.WebService.get(`game/${id}/hints/columns`);
  }
}
