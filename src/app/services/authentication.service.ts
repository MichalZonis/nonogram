import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import Game from '../models/game';
import { WebService } from './web.service';

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token: string = '';

  constructor(
    private router: Router,
    private WebService: WebService
  ) { }

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token && localStorage.getItem('mean-token')) {
      this.token = localStorage.getItem('mean-token')!;
    }
    return this.token;
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return {
        _id: '',
        email: '',
        name: '',
        exp: -1,
        iat: -1,
      };
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public mapToken(response: Observable<any>) {
    return response.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
  }

  public register(user: TokenPayload) {
    return this.mapToken(this.WebService.post("register", user));
  }

  public login(user: TokenPayload): Observable<any> {
    return this.mapToken(this.WebService.post("login", user));
  }

  public profile() {
    return this.mapToken(this.WebService.get("profile", { headers: { Authorization: `Bearer ${this.getToken()}` }}));
  }
/*
  public savePuzzle(newGame: Game) {
    return this.mapToken(this.WebService.post("game", {newGame}, { headers: { Authorization: `Bearer ${this.getToken()}` }}));
  }

  public GetGameBySize(width: number, height: number) {
    console.log(this.getToken())
    return this.mapToken(this.WebService.get(`game/${width}/${height}`, { headers: { Authorization: `Bearer ${this.getToken()}` }}));
  }

  public CheckWin(id: string, boardSeq: string) {
    return this.mapToken(this.WebService.get(`game/${id}/seq/${boardSeq}`, { headers: { Authorization: `Bearer ${this.getToken()}` }}));
  }

  public getBoardSeq(id: String){
    return this.mapToken(this.WebService.get(`game/${id}`, { headers: { Authorization: `Bearer ${this.getToken()}` }}));

  }
*/
  public get(uri: string, payload?: Object) {
    return this.mapToken(this.WebService.get(`${uri}`, { headers: { Authorization: `Bearer ${this.getToken()}` }}))
  }

  public post(uri: string, payload?: Object) {
    return this.mapToken(this.WebService.post(`${uri}`,payload ,{ headers: { Authorization: `Bearer ${this.getToken()}` }}))
  }

  public put(uri: string, payload?: Object) {
    return this.mapToken(this.WebService.put(`${uri}`, { headers: { Authorization: `Bearer ${this.getToken()}` }}))
  }

  public delete(uri: string, payload?: Object) {
    return this.mapToken(this.WebService.delete(`${uri}`, { headers: { Authorization: `Bearer ${this.getToken()}` }}))
  }
}
