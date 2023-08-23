import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  createRange(r: number) {
    return new Array(r);
  }
}
