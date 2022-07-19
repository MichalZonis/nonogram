import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { GameComponent } from './components/game/game.component';
import { HintsComponent } from './components/hints/hints.component';
import { ClockComponent } from './components/clock/clock.component';
import { AppRoutingModule } from './app-routing.module';
import { GameCreationComponent } from './components/game-creation/game-creation.component';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    GameComponent,
    HintsComponent,
    ClockComponent,
    GameCreationComponent,
    LoginComponent,
    SignInComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
